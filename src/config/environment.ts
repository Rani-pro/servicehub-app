import { NativeModules } from 'react-native';

interface EnvironmentConfig {
  ENVIRONMENT: string;
  API_BASE_URL: string;
}

// Get build config from native Android module
const getBuildConfig = (): EnvironmentConfig => {
  if (NativeModules.BuildConfig) {
    return {
      ENVIRONMENT: NativeModules.BuildConfig.ENVIRONMENT || 'development',
      API_BASE_URL: NativeModules.BuildConfig.API_BASE_URL || 'http://localhost:3000',
    };
  }
  
  // Fallback for development/iOS
  return {
    ENVIRONMENT: __DEV__ ? 'development' : 'production',
    API_BASE_URL: __DEV__ ? 'http://localhost:3000' : 'https://api.servicehub.com',
  };
};

export const Environment = getBuildConfig();

export const isStaging = () => Environment.ENVIRONMENT === 'staging';
export const isProduction = () => Environment.ENVIRONMENT === 'production';
export const isDevelopment = () => Environment.ENVIRONMENT === 'development';