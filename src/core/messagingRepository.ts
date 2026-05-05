import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';

class MessagingRepository {
  /**
   * Check if Firebase is initialized
   */
  private isFirebaseInitialized(): boolean {
    return firebase.apps.length > 0;
  }

  /**
   * Get messaging instance safely
   */
  private getMessaging() {
    if (!this.isFirebaseInitialized()) {
      console.warn('Firebase not initialized, messaging unavailable');
      return null;
    }
    return messaging();
  }

  /**
   * Request notification permissions (iOS only, Android auto-grants)
   */
  async requestPermission(): Promise<boolean> {
    try {
      const messagingInstance = this.getMessaging();
      if (!messagingInstance) return false;
      
      const authStatus = await messagingInstance.requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted:', authStatus);
      } else {
        console.log('Notification permission denied');
      }

      return enabled;
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }

  /**
   * Get FCM token for this device
   */
  async getToken(): Promise<string | null> {
    try {
      const messagingInstance = this.getMessaging();
      if (!messagingInstance) return null;
      
      // Request permission first (iOS requirement)
      if (Platform.OS === 'ios') {
        const hasPermission = await this.requestPermission();
        if (!hasPermission) {
          console.log('Cannot get FCM token without notification permission');
          return null;
        }
      }

      const token = await messagingInstance.getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  /**
   * Listen for token refresh
   */
  onTokenRefresh(callback: (token: string) => void): () => void {
    const messagingInstance = this.getMessaging();
    if (!messagingInstance) return () => {};
    
    return messagingInstance.onTokenRefresh(callback);
  }

  /**
   * Delete the FCM token
   */
  async deleteToken(): Promise<void> {
    try {
      const messagingInstance = this.getMessaging();
      if (!messagingInstance) return;
      
      await messagingInstance.deleteToken();
      console.log('FCM token deleted');
    } catch (error) {
      console.error('Error deleting FCM token:', error);
    }
  }
}

export const messagingRepository = new MessagingRepository();