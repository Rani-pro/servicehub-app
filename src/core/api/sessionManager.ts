/**
 * SessionManager
 *
 * Centralised service to manage user session lifecycle.
 *
 * This is a lightweight stub compatible with authInterceptor's interface.
 * Wire up the real logout logic (Redux clear, navigation reset, etc.) here
 * when those layers are added to the project.
 */
import { clearApiCache } from './interceptors/cacheInterceptor';
import { TokenStorageService } from '../storage/secureStorage';
import { initBaseUrl } from './networkConstants';
import logger from '../logger/logger';

export const sessionManager = {
  /**
   * Clears all session data and performs a clean logout.
   * Called automatically by authInterceptor on 401 / token refresh failure.
   */
  async logout(): Promise<void> {
    logger.info('SessionManager: Initiating logout and cleanup...');

    try {
      // 1. Clear API response cache
      clearApiCache();

      // 2. Clear stored tokens
      const tokenStorage = TokenStorageService.getInstance();
      await tokenStorage.clearTokens();

      // 3. Reset base URL to config default
      await initBaseUrl();

      logger.info('SessionManager: Cleanup complete.');
    } catch (error) {
      logger.error('SessionManager: Error during logout cleanup', error);
    }
  },
};
