import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { useAppSelector, useAppDispatch } from './src/shared/hooks/reduxHooks';
import { crashlyticsRepository } from './src/core/crashlyticsRepository';
import { messagingRepository } from './src/core/messagingRepository';
import { notificationService } from './src/features/notifications/services/notificationService';
import { LightColors, DarkColors } from './src/shared/theme/theme';

// Import Crashlytics test utilities for development
import './src/utils/CrashlyticsTestUtils';
// ─── Global JS Error Handler ───────────────────────────────────────────────
// Catches unhandled Promise rejections and uncaught JS errors, records them as
// non-fatal events in Crashlytics so they appear in the Firebase console.
const originalHandler = ErrorUtils.getGlobalHandler();
ErrorUtils.setGlobalHandler(async (error: Error, isFatal?: boolean) => {
  crashlyticsRepository.log(
    `[GlobalErrorHandler] isFatal=${isFatal ?? false} | ${error.message}`,
  );
  await crashlyticsRepository.recordError(error, 'GlobalErrorHandler');
  originalHandler?.(error, isFatal);
});

// ─── Main Component ────────────────────────────────────────────────────────
const Main = () => {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const initCrashlytics = async () => {
      // Enable collection (already on by default, but explicit is better).
      await crashlyticsRepository.setCrashlyticsCollectionEnabled(true);

      // Tag every session with common app-level metadata.
      await crashlyticsRepository.setAttributes({
        app_version: '1.0.0',
        environment: __DEV__ ? 'development' : 'production',
      });

      crashlyticsRepository.log('App mounted – Crashlytics initialised');
    };

    const initMessaging = async () => {
      // Initialize notification service with dispatch
      notificationService.initialize(dispatch);
      
      // Get FCM token
      const token = await messagingRepository.getToken();
      if (token) {
        console.log('FCM Token retrieved successfully');
        // TODO: Send token to your backend server
      }

      // Listen for token refresh
      const unsubscribe = messagingRepository.onTokenRefresh((newToken) => {
        console.log('FCM Token refreshed:', newToken);
        // TODO: Send new token to your backend server
      });

      return unsubscribe;
    };

    initCrashlytics();
    const unsubscribeMessaging = initMessaging();

    return () => {
      unsubscribeMessaging.then((unsub) => unsub?.());
    };
  }, []);

  return (
    <>
      <AppNavigator />
      <StatusBar
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={theme === 'dark' ? DarkColors.background : LightColors.background}
      />
    </>
  );
};

// ─── Root Component ────────────────────────────────────────────────────────
// Firebase is initialized in index.js before the app component mounts
export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </Provider>
  );
}
