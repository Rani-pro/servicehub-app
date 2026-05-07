/**
 * Storage Keys
 *
 * Centralised registry of all storage keys used across the app.
 * Used by MMKV, AsyncStorage, and cache interceptor.
 */
export const STORAGE_KEYS = {
    AUTH: {
        IS_LOGGED_IN: 'auth.isLoggedIn',
        USER_ID: 'auth.userId',
        USER_TOKEN: 'auth.userToken',
    },
    CACHE: {
        /** Prefix applied to every cache key written by cacheInterceptor */
        PREFIX: 'cache_',
    },
    USER: {
        PREFERENCES: 'user.preferences',
        SETTINGS: 'user.settings',
    },
} as const;
