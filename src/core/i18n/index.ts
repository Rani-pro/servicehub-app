/**
 * i18n stub
 *
 * Minimal translation helper referenced by errorInterceptor and
 * connectivityInterceptor. Returns the key itself so error messages
 * are readable even without a real i18n setup.
 *
 * Wire this up to your actual i18n library (i18n-js, react-i18next, etc.)
 * when you add localisation to the project.
 */
export const translate = (key: string, _options?: Record<string, unknown>): string => key;
