import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosClient } from './api/axiosClient';
import { ApiError } from './api/apiErrorHandler';
import {
    ApiResponse,
    ApiSuccessResponse,
    isApiSuccess,
} from './api/models/apiResponse';
import logger from './logger/logger';

/* -------------------------------------------------------------------------- */
/*                              BASE REPOSITORY                                */
/* -------------------------------------------------------------------------- */

/**
 * BaseRepository
 *
 * Abstract base class that all feature repositories must extend.
 * Provides:
 *  - Convenient, type-safe wrappers for GET / POST / PUT / PATCH / DELETE
 *  - Centralised error handling and structured logging
 *  - Automatic unwrapping of ApiSuccessResponse<T>
 *
 * Usage:
 *  class AuthRepository extends BaseRepository {
 *    async login(payload: LoginRequest): Promise<UserModel> {
 *      return this.post<UserModel>('/auth/login', payload);
 *    }
 *  }
 */
export abstract class BaseRepository {
    /* ---------------------------------------------------------------------- */
    /*                            HTTP HELPERS                                 */
    /* ---------------------------------------------------------------------- */

    /**
     * HTTP GET
     * @param url     - Relative endpoint path (e.g. '/users/me')
     * @param config  - Optional Axios request configuration
     */
    protected async get<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this._request<T>(() => axiosClient.get<ApiResponse<T>>(url, config));
    }

    /**
     * HTTP POST
     * @param url     - Relative endpoint path
     * @param data    - Request body payload
     * @param config  - Optional Axios request configuration
     */
    protected async post<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this._request<T>(() =>
            axiosClient.post<ApiResponse<T>>(url, data, config),
        );
    }

    /**
     * HTTP PUT  (full resource replacement)
     * @param url     - Relative endpoint path
     * @param data    - Request body payload
     * @param config  - Optional Axios request configuration
     */
    protected async put<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this._request<T>(() =>
            axiosClient.put<ApiResponse<T>>(url, data, config),
        );
    }

    /**
     * HTTP PATCH  (partial resource update)
     * @param url     - Relative endpoint path
     * @param data    - Partial request body payload
     * @param config  - Optional Axios request configuration
     */
    protected async patch<T>(
        url: string,
        data?: unknown,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this._request<T>(() =>
            axiosClient.patch<ApiResponse<T>>(url, data, config),
        );
    }

    /**
     * HTTP DELETE
     * @param url     - Relative endpoint path
     * @param config  - Optional Axios request configuration
     */
    protected async delete<T>(
        url: string,
        config?: AxiosRequestConfig,
    ): Promise<T> {
        return this._request<T>(() =>
            axiosClient.delete<ApiResponse<T>>(url, config),
        );
    }

    /* ---------------------------------------------------------------------- */
    /*                          CORE REQUEST EXECUTOR                          */
    /* ---------------------------------------------------------------------- */

    /**
     * Central request executor.
     * - Invokes the provided Axios call.
     * - Unwraps ApiSuccessResponse<T> and returns the inner `data`.
     * - Delegates errors to `handleError` for structured logging & re-throwing.
     */
    private async _request<T>(
        fn: () => Promise<AxiosResponse<ApiResponse<T>>>,
    ): Promise<T> {
        try {
            const axiosResponse = await fn();
            const apiResponse = axiosResponse.data;

            if (isApiSuccess(apiResponse)) {
                return (apiResponse as ApiSuccessResponse<T>).data;
            }

            // Server returned success:false  — treat as an error
            throw new ApiError({
                message: apiResponse.message ?? 'An unknown error occurred.',
                statusCode: apiResponse.statusCode,
                code: apiResponse.errorCode,
                fieldErrors: apiResponse.errors,
            });
        } catch (error) {
            return this.handleError(error);
        }
    }

    /* ---------------------------------------------------------------------- */
    /*                           ERROR HANDLING                                */
    /* ---------------------------------------------------------------------- */

    /**
     * Centralised error handler.
     * - Logs all errors via the app logger.
     * - Re-throws ApiError untouched (already structured).
     * - Wraps unknown errors in a generic ApiError.
     *
     * Override in a subclass if you need feature-specific error handling.
     */
    protected handleError(error: unknown): never {
        if (error instanceof ApiError) {
            logger.error(
                `[${this.constructor.name}] ApiError ${error.statusCode ?? ''} — ${error.message}`,
            );
            throw error;
        }

        // Unexpected / network-level error
        const message =
            error instanceof Error ? error.message : 'Unexpected repository error';

        logger.error(`[${this.constructor.name}] Unhandled error —`, message, error);

        throw new ApiError({ message });
    }
}
