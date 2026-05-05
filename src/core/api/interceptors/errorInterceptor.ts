import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ApiError } from '../apiErrorHandler';
import { translate } from '../../i18n';

interface ErrorInterceptor {
  requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestErrorInterceptor: (error: AxiosError) => Promise<never>;
  responseInterceptor: (response: AxiosResponse) => AxiosResponse;
  responseErrorInterceptor: (error: AxiosError) => Promise<never>;
}

export const errorInterceptor: ErrorInterceptor = {
  requestInterceptor: (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    return config;
  },

  requestErrorInterceptor: async (error: AxiosError): Promise<never> => {
    return Promise.reject(error);
  },

  responseInterceptor: (response: AxiosResponse): AxiosResponse => {
    return response;
  },

  responseErrorInterceptor: async (error: any): Promise<never> => {
    // If it's already an ApiError, don't wrap it again
    if (error instanceof ApiError) {
      return Promise.reject(error);
    }

    // If it's not an Axios error, or has no response, handle gracefully
    if (!error.isAxiosError && !(error instanceof Error)) {
      return Promise.reject(
        new ApiError({
          message: translate('unknownError'),
          statusCode: 500,
        })
      );
    }

    const responseData = error.response?.data as any;
    const status = error.response?.status;

    // Extract message from various possible backend formats
    const message =
      responseData?.message ||
      responseData?.error ||
      responseData?.title ||
      error.message ||
      translate('networkErrorLabel');

    // Extract machine-readable code
    const code = responseData?.code || responseData?.errorCode || error.code;

    // Extract structured validation errors
    const fieldErrors = responseData?.errors;

    // Extract trace/correlation ID
    const traceId =
      responseData?.traceId || responseData?.correlationId || responseData?.requestId || responseData?.meta?.requestId;

    const apiError = new ApiError({
      message,
      statusCode: status,
      code: typeof code === 'string' ? code : undefined,
      details: responseData,
      fieldErrors,
      traceId,
    });

    return Promise.reject(apiError);
  },
};

// Legacy export for backward compatibility
export const transformAxiosError = errorInterceptor.responseErrorInterceptor;
