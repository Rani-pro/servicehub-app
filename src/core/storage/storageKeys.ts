/**
 * MMKV Storage Keys
 *
 * Centralised registry of all MMKV storage keys used across the app.
 * Mirrors the EAG structure so that the cacheInterceptor compiles without changes.
 */
export const STORAGE_KEYS = {
    AUTH: {
        IS_LOGGED_IN: 'auth.isLoggedIn',
        USER_ID: 'auth.userId',
    },
    CACHE: {
        /** Prefix applied to every cache key written by cacheInterceptor */
        PREFIX: 'cache_',
    },
} as const;
