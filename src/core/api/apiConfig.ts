import {envConfig} from '../config/env';

/**
 * Global network configuration constants.
 */
export const NETWORK_CONFIG = {
  /** Global request timeout in milliseconds */
  DEFAULT_TIMEOUT: envConfig.apiTimeout,
  /** Base delay for retry mechanisms (ms) */
  RETRY_DELAY: 1000,
  /** Maximum number of retry attempts for failed requests */
  MAX_RETRY_ATTEMPTS: envConfig.retryAttempts,
  /** Time-to-live for cached GET responses (ms) */
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  /** Chunk size for large file uploads */
  UPLOAD_CHUNK_SIZE: 1024 * 1024, // 1MB
} as const;

/**
 * Default Axios configuration
 */
export const AXIOS_CONFIG = {
  timeout: NETWORK_CONFIG.DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};
