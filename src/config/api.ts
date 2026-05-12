import { Environment } from './environment';

// API configuration based on environment
export const API_CONFIG = {
  baseURL: Environment.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Environment-specific configurations
export const APP_CONFIG = {
  environment: Environment.ENVIRONMENT,
  enableLogging: Environment.ENVIRONMENT !== 'production',
  // Enable Crashlytics in all environments for testing
  // Set to false only if user explicitly opts out
  enableCrashlytics: true,
};

console.log(`App running in ${Environment.ENVIRONMENT} environment`);
console.log(`API Base URL: ${Environment.API_BASE_URL}`);