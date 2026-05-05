/**
 * Environment Configuration
 *
 * Centralised place for all environment-level settings.
 * Update the values here (or wire them up to a .env loader) as needed.
 */
export const envConfig = {
    /** Base URL for the main API */
    apiBaseUrl: 'https://api.example.com',

    /** Base URL for VIN decoder search */
    vinSearchUrl: 'https://vinsearch.example.com',

    /** Request timeout in milliseconds */
    apiTimeout: 30_000,

    /** Number of retry attempts for failed requests */
    retryAttempts: 3,

    /** Enable verbose HTTP logging (disable in production) */
    enableLogging: __DEV__,

    /** Enable response caching */
    enableCache: true,
};
