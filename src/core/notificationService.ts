import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform, Alert } from 'react-native';
import { store } from '../store/store';
import { addNotification, Notification } from '../features/notifications/store/notificationSlice';
import { crashlyticsRepository } from './crashlyticsRepository';

class NotificationService {
  private unsubscribeTokenRefresh: (() => void) | null = null;
  private unsubscribeForegroundMessages: (() => void) | null = null;
  private unsubscribeBackgroundMessages: (() => void) | null = null;

  /**
   * Initialize notification service
   */
  async initialize(): Promise<void> {
    try {
      // Request permission
      const hasPermission = await this.requestPermission();
      if (!hasPermission) {
        console.log('Notification permission denied');
        return;
      }

      // Get FCM token
      const token = await this.getToken();
      if (token) {
        console.log('FCM Token:', token);
        // TODO: Send token to your backend server
        await this.sendTokenToServer(token);
      }

      // Set up listeners
      this.setupTokenRefreshListener();
      this.setupForegroundMessageListener();
      this.setupBackgroundMessageHandler();

      crashlyticsRepository.log('NotificationService initialized successfully');
    } catch (error) {
      console.error('Failed to initialize notification service:', error);
      crashlyticsRepository.recordError(error as Error, 'NotificationService.initialize');
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermission(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
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
      crashlyticsRepository.recordError(error as Error, 'NotificationService.requestPermission');
      return false;
    }
  }

  /**
   * Get FCM token
   */
  async getToken(): Promise<string | null> {
    try {
      const token = await messaging().getToken();
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      crashlyticsRepository.recordError(error as Error, 'NotificationService.getToken');
      return null;
    }
  }

  /**
   * Setup token refresh listener
   */
  private setupTokenRefreshListener(): void {
    this.unsubscribeTokenRefresh = messaging().onTokenRefresh(async (token) => {
      console.log('FCM Token refreshed:', token);
      await this.sendTokenToServer(token);
    });
  }

  /**
   * Setup foreground message listener
   */
  private setupForegroundMessageListener(): void {
    this.unsubscribeForegroundMessages = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message received:', remoteMessage);
      
      // Add notification to Redux store
      this.addNotificationToStore(remoteMessage);
      
      // Show in-app notification
      this.showInAppNotification(remoteMessage);
    });
  }

  /**
   * Setup background message handler
   */
  private setupBackgroundMessageHandler(): void {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background message received:', remoteMessage);
      
      // Add notification to Redux store
      this.addNotificationToStore(remoteMessage);
      
      // Handle background notification logic
      await this.handleBackgroundNotification(remoteMessage);
    });
  }

  /**
   * Add notification to Redux store
   */
  private addNotificationToStore(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void {
    const notification: Notification = {
      id: remoteMessage.messageId || Date.now().toString(),
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      data: remoteMessage.data,
      timestamp: Date.now(),
      read: false,
      type: remoteMessage.data?.type as any || 'info',
    };

    store.dispatch(addNotification(notification));
  }

  /**
   * Show in-app notification for foreground messages
   */
  private showInAppNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void {
    const title = remoteMessage.notification?.title || 'New Notification';
    const body = remoteMessage.notification?.body || '';

    Alert.alert(
      title,
      body,
      [
        {
          text: 'Dismiss',
          style: 'cancel',
        },
        {
          text: 'View',
          onPress: () => {
            // Handle notification tap
            this.handleNotificationTap(remoteMessage);
          },
        },
      ]
    );
  }

  /**
   * Handle background notification
   */
  private async handleBackgroundNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage): Promise<void> {
    // Perform any background tasks
    console.log('Processing background notification:', remoteMessage.messageId);
    
    // Update badge count, sync data, etc.
    // This runs even when the app is closed
  }

  /**
   * Handle notification tap
   */
  private handleNotificationTap(remoteMessage: FirebaseMessagingTypes.RemoteMessage): void {
    // Navigate to specific screen based on notification data
    const { data } = remoteMessage;
    
    if (data?.screen) {
      // Navigation will be handled by the component that receives this
      console.log('Navigate to:', data.screen, data.params);
    }
  }

  /**
   * Send token to server
   */
  private async sendTokenToServer(token: string): Promise<void> {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/v1/devices/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization headers if needed
        },
        body: JSON.stringify({
          token,
          platform: Platform.OS,
          deviceId: 'device-id', // Get actual device ID
        }),
      });

      if (response.ok) {
        console.log('Token sent to server successfully');
      } else {
        console.error('Failed to send token to server:', response.status);
      }
    } catch (error) {
      console.error('Error sending token to server:', error);
      // Don't crash the app if server is unavailable
    }
  }

  /**
   * Create local notification
   */
  createLocalNotification(title: string, body: string, data?: Record<string, any>): void {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      body,
      data,
      timestamp: Date.now(),
      read: false,
      type: data?.type || 'info',
    };

    store.dispatch(addNotification(notification));
  }

  /**
   * Get notification count
   */
  getUnreadCount(): number {
    const state = store.getState();
    return state.notifications.unreadCount;
  }

  /**
   * Cleanup listeners
   */
  cleanup(): void {
    if (this.unsubscribeTokenRefresh) {
      this.unsubscribeTokenRefresh();
      this.unsubscribeTokenRefresh = null;
    }
    
    if (this.unsubscribeForegroundMessages) {
      this.unsubscribeForegroundMessages();
      this.unsubscribeForegroundMessages = null;
    }
  }
}

export const notificationService = new NotificationService();