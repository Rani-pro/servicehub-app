/**
 * Logger
 *
 * Lightweight wrapper around console.* so all API-layer files
 * can import `logger` without modification.
 * Replace the body of each method with your preferred logging
 * library (e.g. react-native-logs) when ready.
 */
const logger = {
    debug: (...args: unknown[]) => __DEV__ && console.debug('[DEBUG]', ...args),
    info: (...args: unknown[]) => __DEV__ && console.info('[INFO]', ...args),
    warn: (...args: unknown[]) => __DEV__ && console.warn('[WARN]', ...args),
    error: (...args: unknown[]) => console.error('[ERROR]', ...args),
};

export default logger;
