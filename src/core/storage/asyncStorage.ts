/**
 * AsyncStorage Wrapper
 *
 * Persistent key-value storage backed by @react-native-async-storage/async-storage.
 * Data survives app restarts (unlike the in-memory MMKV stub).
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/** Read a value by key. Returns null if not found. */
export const getItem = async <T = unknown>(key: string): Promise<T | null> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value === null) return null;
        return JSON.parse(value) as T;
    } catch {
        return null;
    }
};

/** Write a value by key. */
export const setItem = async (key: string, value: unknown): Promise<void> => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
        // silently fail
    }
};

/** Remove a single key. */
export const removeItem = async (key: string): Promise<void> => {
    try {
        await AsyncStorage.removeItem(key);
    } catch {
        // silently fail
    }
};

/** Clear all AsyncStorage data. */
export const clearAll = async (): Promise<void> => {
    try {
        await AsyncStorage.clear();
    } catch {
        // silently fail
    }
};
