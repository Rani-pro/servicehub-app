// import crashlytics from '@react-native-firebase/crashlytics';
import CrashlyticsModule from '../types/CrashlyticsModule';

const crashlytics = () => ({
  setUserId: (id: string) => { },
  setAttribute: (k: string, v: string) => { },
  setAttributes: (obj: any) => { },
  log: (msg: string) => { },
  recordError: (e: Error) => { },
  setCrashlyticsCollectionEnabled: (enabled: boolean) => { }
});


export const CrashlyticsUtils = {
  // Test crash using native module (forces immediate crash)
  testCrash: () => {
    CrashlyticsModule.testCrash();
  },

  // Log custom message
  log: (message: string) => {
    crashlytics().log(message);
  },

  // Set user identifier
  setUserId: (userId: string) => {
    crashlytics().setUserId(userId);
  },

  // Record non-fatal error
  recordError: (error: Error) => {
    crashlytics().recordError(error);
  },

  // Set custom attributes
  setAttribute: (key: string, value: string) => {
    crashlytics().setAttribute(key, value);
  },

  // Set custom key-value pairs
  setAttributes: (attributes: { [key: string]: string }) => {
    crashlytics().setAttributes(attributes);
  },

  // Enable/disable crash collection
  setCrashlyticsCollectionEnabled: (enabled: boolean) => {
    crashlytics().setCrashlyticsCollectionEnabled(enabled);
  }
};

export default CrashlyticsUtils;