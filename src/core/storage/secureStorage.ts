/**
 * Secure Token Storage
 *
 * Provides secure storage for auth tokens and generic key-value data
 * using react-native-keychain (iOS Keychain / Android Keystore).
 */

import * as Keychain from 'react-native-keychain';
import { TokenModel } from '../api/models/tokenModel';

// ─── Constants ──────────────────────────────────────────────────────────────

const AUTH_TOKENS_SERVICE = 'auth_tokens';
const GENERIC_DATA_SERVICE_PREFIX = 'generic_data_';

// ─── Service Class ───────────────────────────────────────────────────────────

export class TokenStorageService {
    private static instance: TokenStorageService;

    private constructor() { }

    public static getInstance(): TokenStorageService {
        if (!TokenStorageService.instance) {
            TokenStorageService.instance = new TokenStorageService();
        }
        return TokenStorageService.instance;
    }

    // ─── Tokens ─────────────────────────────────────────────────────────────

    async getTokens(): Promise<TokenModel | null> {
        try {
            const credentials = await Keychain.getGenericPassword({ service: AUTH_TOKENS_SERVICE });
            if (credentials) {
                return JSON.parse(credentials.password) as TokenModel;
            }
        } catch (error) {
            console.error('[SecureStorage] Error getting tokens:', error);
        }
        return null;
    }

    async saveTokens(tokens: TokenModel): Promise<void> {
        try {
            await Keychain.setGenericPassword(
                'user_session',
                JSON.stringify(tokens),
                { service: AUTH_TOKENS_SERVICE }
            );
        } catch (error) {
            console.error('[SecureStorage] Error saving tokens:', error);
        }
    }

    async clearTokens(): Promise<void> {
        try {
            await Keychain.resetGenericPassword({ service: AUTH_TOKENS_SERVICE });
        } catch (error) {
            console.error('[SecureStorage] Error clearing tokens:', error);
        }
    }

    // ─── Generic key-value (used by networkConstants, sessionManager) ────────

    async getItem(key: string): Promise<string | null> {
        try {
            const credentials = await Keychain.getGenericPassword({ 
                service: `${GENERIC_DATA_SERVICE_PREFIX}${key}` 
            });
            if (credentials) {
                return credentials.password;
            }
        } catch (error) {
            console.error(`[SecureStorage] Error getting item ${key}:`, error);
        }
        return null;
    }

    async setItem(key: string, value: string): Promise<void> {
        try {
            await Keychain.setGenericPassword(
                key,
                value,
                { service: `${GENERIC_DATA_SERVICE_PREFIX}${key}` }
            );
        } catch (error) {
            console.error(`[SecureStorage] Error setting item ${key}:`, error);
        }
    }

    async removeItem(key: string): Promise<void> {
        try {
            await Keychain.resetGenericPassword({ 
                service: `${GENERIC_DATA_SERVICE_PREFIX}${key}` 
            });
        } catch (error) {
            console.error(`[SecureStorage] Error removing item ${key}:`, error);
        }
    }
}

/** Pre-created singleton – used by networkConstants */
export const tokenStorage = TokenStorageService.getInstance();
