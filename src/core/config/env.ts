/**
 * Environment Configuration
 *
 * Centralised place for all environment-level settings.
 * Update the values here (or wire them up to a .env loader) as needed.
 */
export const envConfig = {
    /** Base URL for the main API */
    // 10.0.2.2 only works in the Android emulator.
    // For a physical device, replace with your machine's local IP (e.g. 192.168.1.x).
    // Run `ipconfig` (Windows) or `ifconfig` / `ip route` (Mac/Linux) to find it.
    apiBaseUrl: __DEV__
        ? (require('react-native').Platform.OS === 'android'
            ? 'http://localhost:3000'   // emulator → change to your LAN IP for physical device
            : 'http://localhost:3000') // iOS simulator
        : 'https://api.servicehub.com',

   
    /** Request timeout in milliseconds */
    apiTimeout: 30_000,

    /** Number of retry attempts for failed requests */
    retryAttempts: 3,

    /** Enable verbose HTTP logging (disable in production) */
    enableLogging: __DEV__,

    /** Enable response caching */
    enableCache: true,
};
