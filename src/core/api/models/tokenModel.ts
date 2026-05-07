/**
 * --------------------------------------------------------------------------
 * AUTH TOKEN MODEL
 * --------------------------------------------------------------------------
 * Represents authentication tokens returned by an identity provider.
 * Designed to be safe for storage, refresh flows, and request authorization.
 */

export interface TokenModel {
  /** JWT access token used for authorized API requests */
  accessToken: string;

  /** Refresh token used to obtain a new access token */
  refreshToken?: string;

  /** Token type for Authorization header (default: 'Bearer') */
  tokenType: 'Bearer' | string;

  /** Access token validity duration in seconds */
  expiresIn?: number;

  /** Absolute expiration timestamp in milliseconds */
  expiresAt?: number;
}
