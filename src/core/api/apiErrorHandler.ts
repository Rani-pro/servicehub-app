import {ApiFieldError} from './models/apiResponse';
import {HTTP_STATUS} from './networkConstants';

/* -------------------------------------------------------------------------- */
/*                                API ERROR CLASS                              */
/* -------------------------------------------------------------------------- */

/**
 * Custom Error class designed for API-related failures.
 * Encapsulates HTTP status, backend error codes, validation metadata,
 * and optional debugging context.
 */
export class ApiError extends Error {
  /** HTTP status code (e.g., 400, 401, 404, 500) */
  readonly statusCode?: number;

  /** Machine-readable backend error code (e.g., "USER_NOT_FOUND") */
  readonly code?: string;

  /** Raw response data or extra context for debugging */
  readonly details?: unknown;

  /** Field-level validation errors (typically for 400 / 422 responses) */
  readonly fieldErrors?: ApiFieldError[];

  /** Unique identifier for tracing/log correlation */
  readonly traceId?: string;

  constructor(params: {
    message: string;
    statusCode?: number;
    code?: string;
    details?: unknown;
    fieldErrors?: ApiFieldError[];
    traceId?: string;
  }) {
    super(params.message);

    this.name = 'ApiError';
    this.statusCode = params.statusCode;
    this.code = params.code;
    this.details = params.details;
    this.fieldErrors = params.fieldErrors;
    this.traceId = params.traceId;

    // Preserve stack trace (V8 environments)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                               TYPE HELPERS                                */
  /* ------------------------------------------------------------------------ */

  /**
   * Checks whether this error matches a specific backend error code.
   */
  is(code: string): boolean {
    return this.code === code;
  }

  /**
   * Checks if the error represents an authentication failure.
   */
  isAuthError(): boolean {
    return this.statusCode === HTTP_STATUS.UNAUTHORIZED || this.statusCode === HTTP_STATUS.FORBIDDEN;
  }

  /**
   * Checks if the error represents a validation failure.
   */
  isValidationError(): boolean {
    return this.statusCode === HTTP_STATUS.BAD_REQUEST || this.statusCode === HTTP_STATUS.UNPROCESSABLE_ENTITY;
  }

  /**
   * Checks if the error represents a server-side failure.
   */
  isServerError(): boolean {
    return !!this.statusCode && this.statusCode >= HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }
}
