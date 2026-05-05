import { crashlyticsRepository } from '../core/crashlyticsRepository';

/**
 * Crashlytics Test Utilities
 * 
 * These functions can be called from anywhere in your app to test Crashlytics functionality.
 * They are designed to be used during development and QA testing.
 * 
 * Usage examples:
 * - Call from a debug menu
 * - Call from developer tools
 * - Call from console during development
 * - Trigger via remote config or feature flags
 */

export class CrashlyticsTestUtils {
  
  /**
   * Test JavaScript crash - will terminate the app
   */
  static testJSCrash(): void {
    console.log('🔥 Testing JavaScript crash...');
    crashlyticsRepository.testCrash();
  }

  /**
   * Test native crash - will terminate the app
   */
  static async testNativeCrash(): Promise<void> {
    console.log('🔥 Testing native crash...');
    await crashlyticsRepository.testNativeCrash();
  }

  /**
   * Test non-fatal error recording
   */
  static async testNonFatalError(): Promise<void> {
    console.log('📝 Testing non-fatal error recording...');
    await crashlyticsRepository.recordTestError('Test non-fatal error from CrashlyticsTestUtils');
  }

  /**
   * Test user identification
   */
  static async testUserIdentification(): Promise<void> {
    console.log('👤 Testing user identification...');
    const testUserId = `test-user-${Date.now()}`;
    await crashlyticsRepository.setTestUserId(testUserId);
  }

  /**
   * Test custom attributes
   */
  static async testCustomAttributes(): Promise<void> {
    console.log('🏷️ Testing custom attributes...');
    await crashlyticsRepository.setAttributes({
      test_session: 'crashlytics_testing',
      test_timestamp: new Date().toISOString(),
      test_platform: 'android',
      test_environment: __DEV__ ? 'development' : 'production'
    });
  }

  /**
   * Test breadcrumb logging
   */
  static testBreadcrumbs(): void {
    console.log('🍞 Testing breadcrumb logging...');
    crashlyticsRepository.log('Test breadcrumb 1: User started test session');
    crashlyticsRepository.log('Test breadcrumb 2: User navigated to test screen');
    crashlyticsRepository.log('Test breadcrumb 3: User initiated crash test');
  }

  /**
   * Run a comprehensive test suite (non-destructive)
   * This will test all functionality except crashes
   */
  static async runNonDestructiveTests(): Promise<void> {
    console.log('🧪 Running comprehensive Crashlytics test suite...');
    
    try {
      // Test breadcrumbs
      this.testBreadcrumbs();
      
      // Test custom attributes
      await this.testCustomAttributes();
      
      // Test user identification
      await this.testUserIdentification();
      
      // Test non-fatal error
      await this.testNonFatalError();
      
      console.log('✅ All non-destructive Crashlytics tests completed successfully!');
      console.log('📱 Check Firebase Console > Crashlytics to see the results');
      console.log('⚠️ Non-fatal errors may take a few minutes to appear in the console');
      
    } catch (error) {
      console.error('❌ Crashlytics test suite failed:', error);
      crashlyticsRepository.recordError(error as Error, 'CrashlyticsTestSuite');
    }
  }

  /**
   * Show test instructions in console
   */
  static showTestInstructions(): void {
    console.log(`
🔥 CRASHLYTICS TEST UTILITIES 🔥

Available test methods:
1. CrashlyticsTestUtils.testJSCrash() - Test JavaScript crash (DESTRUCTIVE)
2. CrashlyticsTestUtils.testNativeCrash() - Test native crash (DESTRUCTIVE)
3. CrashlyticsTestUtils.testNonFatalError() - Test non-fatal error recording
4. CrashlyticsTestUtils.testUserIdentification() - Test user ID setting
5. CrashlyticsTestUtils.testCustomAttributes() - Test custom attributes
6. CrashlyticsTestUtils.testBreadcrumbs() - Test breadcrumb logging
7. CrashlyticsTestUtils.runNonDestructiveTests() - Run all non-crash tests

DESTRUCTIVE TESTS (will crash the app):
- Use testJSCrash() or testNativeCrash() to test crash reporting
- After crash, restart the app to send the crash report
- Check Firebase Console > Crashlytics after restart

NON-DESTRUCTIVE TESTS:
- Use runNonDestructiveTests() to test all other functionality
- Check Firebase Console > Crashlytics for results

NATIVE CRASH BUTTON:
- Open the app menu (3-dot menu) and select "Test Crash"
- This will trigger a native crash from MainActivity

Firebase Console: https://console.firebase.google.com/
    `);
  }
}

// Make it available globally for easy testing
if (__DEV__) {
  // @ts-ignore
  global.CrashlyticsTestUtils = CrashlyticsTestUtils;
  
  // Show instructions on app start in development
  setTimeout(() => {
    CrashlyticsTestUtils.showTestInstructions();
  }, 2000);
}