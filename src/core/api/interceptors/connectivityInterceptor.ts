import { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { connectivityService } from '../connectivityService';
import { ApiError } from '../apiErrorHandler';
import { translate } from '../../i18n';

interface ConnectivityInterceptor {
  requestInterceptor: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  requestErrorInterceptor?: (error: AxiosError) => Promise<any>;
}

/**
 * Interceptor to check network connectivity before making a request.
 * Fails fast if the device is known to be offline.
 */
export const connectivityInterceptor: ConnectivityInterceptor = {
  requestInterceptor: (config: InternalAxiosRequestConfig) => {
    const isConnected = connectivityService.isConnected();
    const state = connectivityService.getCurrentState();

    // If we know for sure we are offline, block the request
    // state === null means we don't know yet, so we allow it to proceed
    if (state !== null && isConnected === false) {
      throw new ApiError({
        message: translate('noInternetConnection'),
        code: 'NO_INTERNET',
        statusCode: 0,
      });
    }
    return config;
  },

  requestErrorInterceptor: (error: AxiosError) => {
    return Promise.reject(error);
  },
};
