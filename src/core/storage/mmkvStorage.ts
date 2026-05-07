/**
 * MMKV Storage Stub
 *
 * Lightweight synchronous key-value store backed by a plain JS Map.
 * Swap this body for a real MMKV implementation (react-native-mmkv)
 * when the dependency is available in the project.
 *
 * The public API intentionally mirrors the EAG mmkvStorage module so
 * all imported call-sites compile without modification.
 */

const store = new Map<string, unknown>();

/** Read a value (returns null if not found). */
export const getData = <T = unknown>(key: string): T | null => {
    return (store.get(key) as T) ?? null;
};

/** Write a value. */
export const storeData = (key: string, value: unknown): void => {
    store.set(key, value);
};

/** Delete a single key. */
export const deleteUserStorageSpecificData = (key: string): void => {
    store.delete(key);
};

/** Clear all stored data. */
export const clearAllData = (): void => {
    store.clear();
};
