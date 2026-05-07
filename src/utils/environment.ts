import { Environment } from '../config';

/**
 * Utility functions for environment detection and configuration
 */
export class EnvironmentUtils {
  /**
   * Check if the app is running in production environment
   */
  static isProduction(): boolean {
    return Environment.IS_PRODUCTION;
  }

  /**
   * Check if the app is running in staging environment
   */
  static isStaging(): boolean {
    return Environment.ENVIRONMENT === 'staging';
  }

  /**
   * Get the current environment name
   */
  static getEnvironmentName(): string {
    return Environment.ENVIRONMENT;
  }

  /**
   * Get the API base URL for the current environment
   */
  static getApiBaseUrl(): string {
    return Environment.API_BASE_URL;
  }

  /**
   * Log environment information (only in debug mode)
   */
  static logEnvironmentInfo(): void {
    if (__DEV__ || Environment.DEBUG_MODE) {
      console.log('🌍 Environment Info:', {
        environment: Environment.ENVIRONMENT,
        isProduction: Environment.IS_PRODUCTION,
        apiBaseUrl: Environment.API_BASE_URL,
        appName: Environment.APP_NAME,
        debugMode: Environment.DEBUG_MODE,
      });
    }
  }
}

export default EnvironmentUtils;