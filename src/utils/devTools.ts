/**
 * DevTools Utility
 *
 * React Native 0.73+ me Flipper officially replace ho gaya hai
 * React Native DevTools se. Yeh utility dev-only helpers provide karta hai.
 *
 * DevTools open karne ke liye:
 *   - Android: adb shell input keyevent 82  (ya device shake)
 *   - iOS:     Cmd+D (simulator) ya device shake
 *   - Then "Open DevTools" select karo
 *
 * ADB Logs dekhne ke liye terminal me run karo:
 *   adb logcat *:S ReactNative:V ReactNativeJS:V
 */

if (__DEV__) {
  // Network request logging — console me visible hoga aur RN DevTools me bhi
  const g = globalThis as typeof globalThis & { fetch: typeof fetch };
  const originalFetch = g.fetch;
  g.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input instanceof URL ? input.href : typeof input === 'string' ? input : (input as Request).url;
    const method = init?.method ?? 'GET';

    console.log(`[Network] ➡️  ${method} ${url}`);
    const start = Date.now();

    try {
      const response = await originalFetch(input as RequestInfo, init);
      const duration = Date.now() - start;
      console.log(`[Network] ✅ ${method} ${url} — ${response.status} (${duration}ms)`);
      return response;
    } catch (error) {
      const duration = Date.now() - start;
      console.log(`[Network] ❌ ${method} ${url} — FAILED (${duration}ms)`, error);
      throw error;
    }
  };

  console.log('🛠️  DevTools ready.');
  console.log('📡 Network logging enabled.');
  console.log('🔍 Open React Native DevTools: shake device → "Open DevTools"');
  console.log('📋 ADB logs: adb logcat *:S ReactNative:V ReactNativeJS:V');
}
