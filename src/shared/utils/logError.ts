/**
 * logError
 *
 * Utility helper that logs an error with a consistent format.
 * Mirrors the EAG logError signature so networkConstants compiles unchanged.
 *
 * @param tag      - Feature/module tag (e.g. 'BaseURL')
 * @param location - File or function name where error occurred
 * @param error    - The caught error value
 */
const logError = (tag: string, location: string, error: unknown): void => {
    console.error(`[${tag}] Error in ${location}:`, error);
};

export default logError;
