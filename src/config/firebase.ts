import firebase from '@react-native-firebase/app';
import '@react-native-firebase/crashlytics';
import '@react-native-firebase/messaging';

/**
 * Initialize Firebase
 * This must be called before any Firebase services are used.
 * 
 * Note: The actual configuration (API keys, project IDs, etc.) comes from:
 * - iOS: GoogleService-Info.plist in ios/SERVICEHUB/
 * - Android: google-services.json in android/app/
 */
export const initializeFirebase = async (): Promise<void> => {
  try {
    // React Native Firebase auto-initializes when the app starts
    // We just need to ensure the app is ready
    const app = firebase.app();
    console.log('Firebase initialized successfully:', app.name);
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    throw error;
  }
};

export default firebase;
