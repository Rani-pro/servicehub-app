/**
 * @format
 */

import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Import Firebase app first to ensure initialization
import firebase from '@react-native-firebase/app';

// Verify Firebase is initialized before importing other modules
if (!firebase.apps.length) {
  console.error('Firebase not initialized! Check your google-services.json and GoogleService-Info.plist files.');
} else {
  console.log('Firebase initialized successfully');
}

// Import other Firebase modules after app initialization
import crashlytics from '@react-native-firebase/crashlytics';
import '@react-native-firebase/messaging';
import '@react-native-firebase/analytics';
import '@react-native-firebase/auth';

// Enable Crashlytics collection (required for debug builds to report crashes)
crashlytics().setCrashlyticsCollectionEnabled(true);

AppRegistry.registerComponent(appName, () => App);
