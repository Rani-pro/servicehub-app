/**
 * Secure Token Storage
 *
 * Provides a simple in-memory token store with the same public interface
 * as the EAG secureStorage module (TokenStorageService + tokenStorage).
 *
 * Replace the Map with react-native-keychain / expo-secure-store when ready.
 */

import { TokenModel } from '../api/models/tokenModel';

// ─── Service Class ───────────────────────────────────────────────────────────

export class TokenStorageService {
    private static instance: TokenStorageService;

    private tokens: TokenModel | null = null;
    private extras = new Map<string, string>();

    private constructor() { }

    public static getInstance(): TokenStorageService {
        if (!TokenStorageService.instance) {
            TokenStorageService.instance = new TokenStorageService();
        }
        return TokenStorageService.instance;
    }

    // ─── Tokens ─────────────────────────────────────────────────────────────

    async getTokens(): Promise<TokenModel | null> {
        return this.tokens;
    }

    async saveTokens(tokens: TokenModel): Promise<void> {
        this.tokens = tokens;
    }

    async clearTokens(): Promise<void> {
        this.tokens = null;
        this.extras.clear();
    }

    // ─── Generic key-value (used by networkConstants, sessionManager) ────────

    async getItem(key: string): Promise<string | null> {
        return this.extras.get(key) ?? null;
    }

    async setItem(key: string, value: string): Promise<void> {
        this.extras.set(key, value);
    }

    async removeItem(key: string): Promise<void> {
        this.extras.delete(key);
    }
}

/** Pre-created singleton – used by networkConstants */
export const tokenStorage = TokenStorageService.getInstance();
