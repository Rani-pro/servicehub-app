import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import logger from '../../logger/logger';
import {HTTP_STATUS, HEADERS, getUrl} from '../networkConstants';
import {TokenStorageService} from '../../storage/secureStorage';
import {sessionManager} from '../sessionManager';

interface AuthInterceptor {
  requestInterceptor: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig>;
  requestErrorInterceptor: (error: AxiosError) => Promise<never>;
  responseInterceptor: (response: AxiosResponse) => AxiosResponse;
  responseErrorInterceptor: (error: AxiosError) => Promise<any>;
}

// State for handling token refresh
let isRefreshing = false;
let isLoggedOut = false;
let failedQueue: {resolve: (data: {token: string; type: string} | null) => void; reject: (error: any) => void}[] = [];

/**
 * Processes the queue of pending requests after a token refresh attempt.
 */
const processQueue = (error: any, data: {token: string; type: string} | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(data);
    }
  });
  failedQueue = [];
};

/**
 * Globally clears session and redirects to login by updating Redux state and storage.
 * This ensures all user-sensitive data is wiped on session expiration (401).
 */
const triggerGlobalLogout = async () => {
  if (isLoggedOut) return;
  isLoggedOut = true;

  logger.info('AuthInterceptor: Global logout triggered. Redirecting...');

  try {
    await sessionManager.logout();
  } catch (err) {
    logger.error('AuthInterceptor: Failed to complete global logout cleanup', err);
  }
};

export const authInterceptor: AuthInterceptor = {
  requestInterceptor: async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    try {
      // Skip auth for login/refresh or if skipAuth flag is provided
      if (
        config.url?.includes('tokens/app-login') ||
        config.url?.includes('tokens/app-refresh') ||
        config.skipAuth === true
      ) {
        return config;
      }

      const tokenStorage = TokenStorageService.getInstance();
      const token = await tokenStorage.getTokens();

      if (token?.accessToken) {
        const authHeader = `${token.tokenType || 'Bearer'} ${token.accessToken}`;

        if (config.headers.set) {
          config.headers.set(HEADERS.AUTHORIZATION, authHeader);
        } else {
          config.headers[HEADERS.AUTHORIZATION] = authHeader;
        }

        logger.debug(`AuthInterceptor: Attached token to ${config.url}`);
      } else {
        logger.debug(`AuthInterceptor: No token found for ${config.url}`);
      }

      return config;
    } catch (error) {
      logger.warn('AuthInterceptor: Failed to attach auth token. Proceeding without authentication.', error);
      return config;
    }
  },

  requestErrorInterceptor: async (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  },

  responseInterceptor: (response: AxiosResponse): AxiosResponse => {
    if (response.config.url?.includes('tokens/app-login') || response.config.url?.includes('tokens/app-refresh')) {
      isLoggedOut = false;
    }
    return response;
  },

  responseErrorInterceptor: async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 1. Guard against 401 on the refresh endpoint itself to prevent infinite loops
    if (originalRequest?.url?.includes('tokens/app-refresh')) {
      isRefreshing = false;
      await triggerGlobalLogout();
      return Promise.reject(error);
    }

    // 2. Handle 401 Unauthorized errors
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      if (originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;

      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({resolve, reject});
        })
          .then((data: any) => {
            if (data) {
              const authHeader = `${data.type} ${data.token}`;
              if (originalRequest.headers.set) {
                originalRequest.headers.set(HEADERS.AUTHORIZATION, authHeader);
              } else {
                originalRequest.headers[HEADERS.AUTHORIZATION] = authHeader;
              }
              return axios(originalRequest);
            }
            return Promise.reject(error);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      logger.info('AuthInterceptor: 401 Unauthorized detected. Attempting token refresh...');

      try {
        const tokenStorage = TokenStorageService.getInstance();
        const tokens = await tokenStorage.getTokens();

        if (tokens?.refreshToken) {
          logger.debug('AuthInterceptor: Refresh token found. Requesting new access token.');

          try {
            const refreshResponse = await axios.post(getUrl('refreshToken'), {
              refresh_token: tokens.refreshToken,
            });

            if (refreshResponse.status !== HTTP_STATUS.OK) {
              const nonOkError = new Error(
                `Token refresh failed with status ${refreshResponse.status}${refreshResponse.statusText ? ` (${refreshResponse.statusText})` : ''}`
              );
              logger.error('AuthInterceptor: Token refresh non-OK response:', nonOkError);
              processQueue(nonOkError, null);
              isRefreshing = false;
              await triggerGlobalLogout();
              return Promise.reject(nonOkError);
            }

            const newTokens = refreshResponse.data;

            const mappedTokens = {
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token || tokens.refreshToken,
              tokenType: newTokens.token_type || 'Bearer',
              expiresAt: Date.now() + (newTokens.expires_in || 3600) * 1000,
            };

            await tokenStorage.saveTokens(mappedTokens);
            logger.info('AuthInterceptor: Token refresh successful.');

            // Explicitly flush queue with token and type
            processQueue(null, {token: mappedTokens.accessToken, type: mappedTokens.tokenType});
            isRefreshing = false;

            // Retry original request
            const authHeader = `${mappedTokens.tokenType} ${mappedTokens.accessToken}`;
            if (originalRequest.headers.set) {
              originalRequest.headers.set(HEADERS.AUTHORIZATION, authHeader);
            } else {
              originalRequest.headers[HEADERS.AUTHORIZATION] = authHeader;
            }

            return axios(originalRequest);
          } catch (refreshError: any) {
            logger.error('AuthInterceptor: Token refresh request failed:', refreshError);
            processQueue(refreshError, null);
            isRefreshing = false;
            await triggerGlobalLogout();
            return Promise.reject(refreshError);
          }
        } else {
          logger.debug('AuthInterceptor: No refresh token available. Clearing session.');
          processQueue(new Error('No refresh token available'), null);
          isRefreshing = false;
          await triggerGlobalLogout();
          return Promise.reject(error);
        }
      } catch (err) {
        logger.error('AuthInterceptor: Critical failure during 401 remediation:', err);
        processQueue(err, null);
        isRefreshing = false;
        await triggerGlobalLogout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
};

// Legacy exports for backward compatibility
export const attachAuthToken = authInterceptor.requestInterceptor;
export const onAuthRequestError = authInterceptor.requestErrorInterceptor;
