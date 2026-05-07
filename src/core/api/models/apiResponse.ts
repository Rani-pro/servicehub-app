/**
 * --------------------------------------------------------------------------
 * API RESPONSE CONTRACT
 * --------------------------------------------------------------------------
 * Generic wrapper for all API responses.
 * Enforces a consistent and predictable structure across the application.
 *
 * @template T - The type of the payload contained in the `data` property.
 */

/* -------------------------------------------------------------------------- */
/*                               SUCCESS RESPONSE                              */
/* -------------------------------------------------------------------------- */

export interface ApiSuccessResponse<T> {
  /** Indicates successful business operation */
  success: true;
  /** HTTP status code returned by server */
  statusCode: number;
  /** Typed response payload */
  data: T;
  /** Optional human-readable message */
  message?: string;
  /** Optional metadata (pagination, request info, etc.) */
  meta?: ApiMeta;
}

/* -------------------------------------------------------------------------- */
/*                                ERROR RESPONSE                               */
/* -------------------------------------------------------------------------- */

export interface ApiErrorResponse {
  /** Indicates failed business operation */
  success: false;
  /** HTTP status code returned by server */
  statusCode: number;
  /** Human-readable error message */
  message: string;
  /** Optional short error identifier/code from backend */
  errorCode?: string;
  /** Field-level validation or business errors */
  errors?: ApiFieldError[];
  /** Optional raw error payload */
  data?: unknown;
}

/* -------------------------------------------------------------------------- */
/*                              SUPPORTING TYPES                               */
/* -------------------------------------------------------------------------- */

export interface ApiFieldError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiMeta {
  page?: number;
  pageSize?: number;
  limit?: number;
  totalItems?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  requestId?: string;
  timestamp?: string;
}

/* -------------------------------------------------------------------------- */
/*                              UNIFIED RESPONSE                               */
/* -------------------------------------------------------------------------- */

/**
 * ApiResponse<T>
 * Discriminated union enforcing correct success/error handling.
 */
export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/* -------------------------------------------------------------------------- */
/*                               TYPE GUARDS                                   */
/* -------------------------------------------------------------------------- */

/**
 * Type guard to check if API response is successful
 */
export const isApiSuccess = <T>(response: ApiResponse<T>): response is ApiSuccessResponse<T> =>
  response.success === true;

/**
 * Type guard to check if API response is an error
 */
export const isApiError = <T>(response: ApiResponse<T>): response is ApiErrorResponse => response.success === false;
