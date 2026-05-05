import {AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig} from 'axios';
import {envConfig} from '../../config/env';
import {NETWORK_CONFIG} from '../apiConfig';

interface RetryConfig {
  retries: number;
  retryDelay: number;
  retryCondition: (error: AxiosError) => boolean;
  retryDelayFactor: number;
  maxRetryDelay: number;
}

interface RetryInterceptor {
  requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestErrorInterceptor: (error: AxiosError) => Promise<any>;
  responseInterceptor: (response: AxiosResponse) => AxiosResponse;
  responseErrorInterceptor: (error: AxiosError) => Promise<any>;
}

// Extend AxiosRequestConfig for custom properties
declare module 'axios' {
  export interface AxiosRequestConfig {
    retryConfig?: RetryConfig;
  }
}

class RetryManager {
  private retryCounts: Map<string, number> = new Map();
  private retryTimers: Map<string, any> = new Map();

  public generateRequestKey(config: AxiosRequestConfig): string {
    const {method, url, params, data} = config;
    return `${method?.toUpperCase()}_${url}_${JSON.stringify(params)}_${JSON.stringify(data)}`;
  }

  private shouldRetry(error: AxiosError): boolean {
    // Don't retry if retries are disabled
    if (envConfig.retryAttempts <= 0) {
      return false;
    }

    // Don't retry if request has no-retry header
    if (error.config?.headers?.['x-no-retry'] === 'true') {
      return false;
    }

    // Don't retry on user cancellation
    if (error.code === 'ERR_CANCELED') {
      return false;
    }

    // Retry on network errors
    if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
      return true;
    }

    // Retry on specific HTTP status codes
    if (error.response) {
      const status = error.response.status;
      const retryableStatuses = [
        408, // Request Timeout
        429, // Too Many Requests
        500, // Internal Server Error
        502, // Bad Gateway
        503, // Service Unavailable
        504, // Gateway Timeout
      ];
      return retryableStatuses.includes(status);
    }

    return false;
  }

  private getRetryDelay(retryCount: number, baseDelay: number = NETWORK_CONFIG.RETRY_DELAY): number {
    // Exponential backoff with jitter
    const exponentialDelay = baseDelay * Math.pow(2, retryCount);
    const jitter = Math.random() * 0.1 * exponentialDelay; // 10% jitter
    const delay = exponentialDelay + jitter;

    // Cap the delay at a reasonable maximum
    return Math.min(delay, NETWORK_CONFIG.RETRY_DELAY * 10);
  }

  private async wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(() => resolve(), ms));
  }

  public async retryRequest(error: AxiosError, retryConfig: RetryConfig): Promise<AxiosResponse> {
    const requestKey = this.generateRequestKey(error.config as AxiosRequestConfig);
    const currentRetryCount = this.retryCounts.get(requestKey) || 0;

    // Check if we should retry
    if (!this.shouldRetry(error) || currentRetryCount >= retryConfig.retries) {
      this.retryCounts.delete(requestKey);
      throw error;
    }

    // Increment retry count
    this.retryCounts.set(requestKey, currentRetryCount + 1);

    // Calculate delay
    const delay = this.getRetryDelay(currentRetryCount, retryConfig.retryDelay);

    // Wait before retrying
    await this.wait(delay);

    // Clear any existing timer for this request
    const existingTimer = this.retryTimers.get(requestKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // Retry the request
    try {
      const response = await this.executeRetry(error.config as AxiosRequestConfig);
      this.retryCounts.delete(requestKey);
      this.retryTimers.delete(requestKey);
      return response;
    } catch (retryError) {
      // If retry fails, try again recursively
      return this.retryRequest(retryError as AxiosError, retryConfig);
    }
  }

  private async executeRetry(config: AxiosRequestConfig): Promise<AxiosResponse> {
    // Import axios dynamically to avoid circular dependencies
    const axios = await import('axios');

    // Create a new config for retry
    const retryConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        ...config.headers,
        'x-retry-count': (this.retryCounts.get(this.generateRequestKey(config)) || 0).toString(),
      },
    };

    return axios.default(retryConfig);
  }

  public clearRetryCount(requestKey: string): void {
    this.retryCounts.delete(requestKey);
    this.retryTimers.delete(requestKey);
  }

  public getRetryCount(requestKey: string): number {
    return this.retryCounts.get(requestKey) || 0;
  }
}

const retryManager = new RetryManager();

export const retryInterceptor: RetryInterceptor = {
  requestInterceptor: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    // Add retry configuration to request
    if (!config.retryConfig) {
      config.retryConfig = {
        retries: envConfig.retryAttempts,
        retryDelay: NETWORK_CONFIG.RETRY_DELAY,
        retryCondition: (error: AxiosError) => {
          // Default retry condition - can be overridden
          return !!(
            error.code === 'ERR_NETWORK' ||
            error.code === 'ECONNABORTED' ||
            (error.response && [408, 429, 500, 502, 503, 504].includes(error.response.status))
          );
        },
        retryDelayFactor: 2,
        maxRetryDelay: NETWORK_CONFIG.RETRY_DELAY * 10,
      };
    }

    return config;
  },

  requestErrorInterceptor: async (error: AxiosError): Promise<any> => {
    return Promise.reject(error);
  },

  responseInterceptor: (response: AxiosResponse): AxiosResponse => {
    // Clear retry count on successful response
    const requestKey = retryManager.generateRequestKey(response.config as AxiosRequestConfig);
    retryManager.clearRetryCount(requestKey);
    return response;
  },

  responseErrorInterceptor: async (error: AxiosError): Promise<any> => {
    const retryConfig = error.config?.retryConfig;

    if (!retryConfig) {
      return Promise.reject(error);
    }

    try {
      const response = await retryManager.retryRequest(error, retryConfig);
      return Promise.resolve(response);
    } catch (retryError) {
      return Promise.reject(retryError);
    }
  },
};
