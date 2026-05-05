import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {envConfig} from '../../config/env';
import logger from '../../logger/logger';

interface LoggerInterceptor {
  requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestErrorInterceptor: (error: AxiosError) => Promise<never>;
  responseInterceptor: (response: AxiosResponse) => AxiosResponse;
  responseErrorInterceptor: (error: AxiosError) => Promise<never>;
}

export const loggerInterceptor: LoggerInterceptor = {
  requestInterceptor: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    if (envConfig.enableLogging) {
      // Avoid sensitive data in logs
      const safeHeaders = {...config.headers} as Record<string, unknown>;
      delete safeHeaders['Authorization'];
      delete safeHeaders['authorization'];

      logger.info(`🚀 [HTTP Request] ${config.method?.toUpperCase()} ${config.url}`, {
        params: config.params || {},
        data: config.data || {},
        headers: safeHeaders,
      });

      // Inject start time for duration tracking
      (config as InternalAxiosRequestConfig & {metadata?: {startTime: number}}).metadata = {
        startTime: Date.now(),
      };
    }
    return config;
  },

  requestErrorInterceptor: async (error: AxiosError): Promise<never> => {
    if (envConfig.enableLogging) {
      logger.error(`❌ [HTTP Request Error] ${error.message}`, {
        url: error.config?.url,
        method: error.config?.method,
      });
    }
    return Promise.reject(error);
  },

  responseInterceptor: (response: AxiosResponse): AxiosResponse => {
    if (envConfig.enableLogging) {
      const metadata = (response.config as InternalAxiosRequestConfig & {metadata?: {startTime: number}}).metadata;
      let durationText = '';
      if (metadata?.startTime) {
        const duration = Date.now() - metadata.startTime;
        durationText = ` (${duration}ms)`;
      }

      logger.info(`✅ [HTTP Response] ${response.status} ${response.config.url}${durationText}`, {
        status: response.status,
        url: response.config.url,
        result: response.data,
      });
    }
    return response;
  },

  responseErrorInterceptor: async (error: AxiosError): Promise<never> => {
    if (envConfig.enableLogging) {
      const status = error.response?.status || 'N/A';
      const url = error.config?.url || 'unknown';
      const method = error.config?.method?.toUpperCase() || 'UNKNOWN';

      logger.warn(`🛑 [HTTP Error] ${status} ${method} ${url}: ${error.message}`);

      logger.debug('[HTTP Error Details]', {
        status,
        url,
        method,
        code: error.code,
        params: error.config?.params,
        requestData: error.config?.data,
        responseData: error.response?.data,
      });
    }
    return Promise.reject(error);
  },
};

// Legacy exports for backward compatibility
export const onRequestLog = loggerInterceptor.requestInterceptor;
export const onResponseLog = loggerInterceptor.responseInterceptor;
export const onResponseErrorLog = loggerInterceptor.responseErrorInterceptor;
