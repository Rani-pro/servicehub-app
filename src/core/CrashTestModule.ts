import { NativeModules } from 'react-native';

interface CrashTestModuleInterface {
  /**
   * Triggers a native crash for testing Crashlytics.
   * This will terminate the app immediately.
   */
  testNativeCrash(): Promise<string>;

  /**
   * Records a non-fatal test error to Crashlytics.
   * @param message - The error message to record
   */
  recordTestError(message: string): Promise<string>;

  /**
   * Sets a test user ID for Crashlytics.
   * @param userId - The user ID to set
   */
  setTestUserId(userId: string): Promise<string>;
}

const { CrashTestModule } = NativeModules;

export default CrashTestModule as CrashTestModuleInterface;