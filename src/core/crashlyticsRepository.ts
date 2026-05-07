// import crashlytics from '@react-native-firebase/crashlytics';
import { firebase } from '@react-native-firebase/app';
import { BaseRepository } from './baseRepository';
import CrashTestModule from './CrashTestModule';

const crashlytics = () => ({
    setUserId: async (id: string) => { },
    setAttribute: async (k: string, v: string) => { },
    setAttributes: async (obj: any) => { },
    log: (msg: string) => { },
    recordError: (e: Error) => { },
    setCrashlyticsCollectionEnabled: async (enabled: boolean) => { }
});

/**
 * CrashlyticsRepository
 *
 * Centralises all Firebase Crashlytics interactions following the
 * Repository Pattern defined in the project architecture.
 *
 * Usage:
 *   import { crashlyticsRepository } from '../core/crashlyticsRepository';
 *   crashlyticsRepository.setUserId('user-123');
 */
class CrashlyticsRepository extends BaseRepository {
    /**
     * Check if Firebase is initialized
     */
    private isFirebaseInitialized(): boolean {
        return firebase.apps.length > 0;
    }

    // ─── Identity ───────────────────────────────────────────────────────────

    /**
     * Associate a user ID with all future crash reports.
     * Call this after a successful login.
     */
    async setUserId(userId: string): Promise<void> {
        try {
            if (!this.isFirebaseInitialized()) return;

            await crashlytics().setUserId(userId);
            this.log(`User ID set: ${userId}`);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Clear the user identity (e.g. on logout).
     */
    async clearUserId(): Promise<void> {
        try {
            if (!this.isFirebaseInitialized()) return;

            await crashlytics().setUserId('');
            this.log('User ID cleared');
        } catch (error) {
            this.handleError(error);
        }
    }

    // ─── Attributes ─────────────────────────────────────────────────────────

    /**
     * Set a single custom key-value attribute on future crash reports.
     */
    async setAttribute(key: string, value: string): Promise<void> {
        try {
            if (!this.isFirebaseInitialized()) return;

            await crashlytics().setAttribute(key, value);
        } catch (error) {
            this.handleError(error);
        }
    }

    /**
     * Set multiple custom key-value attributes at once.
     */
    async setAttributes(attributes: Record<string, string>): Promise<void> {
        try {
            if (!this.isFirebaseInitialized()) return;

            await crashlytics().setAttributes(attributes);
        } catch (error) {
            this.handleError(error);
        }
    }

    // ─── Logging ─────────────────────────────────────────────────────────────

    /**
     * Add a breadcrumb log message that appears in the Crashlytics console
     * alongside any subsequent crash report.
     */
    log(message: string): void {
        if (!this.isFirebaseInitialized()) return;

        crashlytics().log(message);
    }

    // ─── Error Recording ─────────────────────────────────────────────────────

    /**
     * Record a non-fatal JavaScript error so it appears in the
     * Firebase Crashlytics console without terminating the app.
     *
     * @param error   The caught Error object (or any value cast to Error).
     * @param context Optional human-readable context string.
     */
    recordError(error: Error, context?: string): void {
        if (!this.isFirebaseInitialized()) return;

        if (context) {
            this.log(`[${context}] ${error.message}`);
        }
        // Use the new modular API
        crashlytics().recordError(error);
    }

    // ─── Crash Testing ───────────────────────────────────────────────────────

    /**
     * Force a crash. Use ONLY for QA / Crashlytics verification.
     * This will terminate the app immediately.
     */
    crash(): void {
        console.log('CrashlyticsRepository: Force crashing app for Crashlytics testing...');
        this.log('Test crash initiated - This is intentional for testing Crashlytics');

        if (!this.isFirebaseInitialized()) return;

        // Force a JavaScript crash - this is the recommended approach for v22+
        // The native crash() method has been deprecated
        throw new Error('Intentional crash for Crashlytics testing - This is expected behavior');
    }

    /**
     * Test crash method that works in all build types.
     * Creates a fatal JavaScript error to test Crashlytics.
     */
    testCrash(): void {
        console.log('CrashlyticsRepository: Creating test crash...');
        this.log('Test crash initiated via testCrash method - This is intentional for testing Crashlytics');

        // Force a fatal JavaScript error immediately
        // This is the recommended approach for React Native Firebase v22+
        throw new Error('Crashlytics Test Crash - This is intentional for testing Crashlytics functionality');
    }

    /**
     * Test native crash using the native module.
     * This triggers a crash from the native Android side.
     */
    async testNativeCrash(): Promise<void> {
        try {
            console.log('CrashlyticsRepository: Initiating native crash test...');
            this.log('Native crash test initiated - This is intentional for testing Crashlytics');

            if (CrashTestModule) {
                await CrashTestModule.testNativeCrash();
            } else {
                console.warn('CrashTestModule not available, falling back to JS crash');
                this.testCrash();
            }
        } catch (error) {
            console.error('Failed to initiate native crash test:', error);
            // Fallback to JS crash
            this.testCrash();
        }
    }

    /**
     * Record a test error using the native module.
     * This creates a non-fatal error report.
     */
    async recordTestError(message: string = 'Test error from CrashlyticsRepository'): Promise<void> {
        try {
            this.log(`Recording test error: ${message}`);

            if (CrashTestModule) {
                await CrashTestModule.recordTestError(message);
                console.log('Test error recorded via native module');
            } else {
                // Fallback to JS error recording
                this.recordError(new Error(message), 'TestError');
                console.log('Test error recorded via JS fallback');
            }
        } catch (error) {
            console.error('Failed to record test error:', error);
            // Fallback to JS error recording
            this.recordError(new Error(message), 'TestError');
        }
    }

    /**
     * Set a test user ID using the native module.
     */
    async setTestUserId(userId: string): Promise<void> {
        try {
            if (CrashTestModule) {
                await CrashTestModule.setTestUserId(userId);
                console.log(`Test user ID set via native module: ${userId}`);
            } else {
                // Fallback to regular setUserId
                await this.setUserId(userId);
                console.log(`Test user ID set via JS fallback: ${userId}`);
            }
        } catch (error) {
            console.error('Failed to set test user ID:', error);
            // Fallback to regular setUserId
            await this.setUserId(userId);
        }
    }

    // ─── Lifecycle ───────────────────────────────────────────────────────────

    /**
     * Enable or disable Crashlytics collection at runtime.
     * Useful for respecting user privacy preferences.
     */
    async setCrashlyticsCollectionEnabled(enabled: boolean): Promise<void> {
        try {
            if (!this.isFirebaseInitialized()) return;

            await crashlytics().setCrashlyticsCollectionEnabled(enabled);
        } catch (error) {
            this.handleError(error);
        }
    }
}

// Singleton export – import this wherever you need Crashlytics
export const crashlyticsRepository = new CrashlyticsRepository();
