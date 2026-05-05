import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { AppDispatch } from '../../../store/store';
import { addNotification } from '../store/notificationSlice';
import { Notification, FCMMessage } from '../types';
import { Platform, Alert } from 'react-native';
import { navigationRef } from '../../../navigation/navigationRef';

class NotificationService {
  private dispatch: AppDispatch | null = null;

  /**
   * Initialize the notification service with Redux dispatch
   */
  initialize(dispatch: AppDispatch) {
    this.dispatch = dispatch;
    this.setupMessageHandlers();
  }

  /**
   * Setup FCM message handlers for different app states
   */
  private setupMessageHandlers() {
    // Handle messages when app is in foreground
    messaging().onMessage(this.handleForegroundMessage.bind(this));

    // Handle notification opened app (background/quit state)
    messaging().onNotificationOpenedApp(this.handleNotificationOpenedApp.bind(this));

    // Handle notification when app was opened from quit state
    messaging()
      .getInitialNotification()
      .then(this.handleInitialNotification.bind(this));
  }

  /**
   * Handle messages when app is in foreground
   */
  private handleForegroundMessage(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    console.log('Foreground message received:', remoteMessage);
    
    const notification = this.createNotificationFromFCM(remoteMessage);
    
    if (this.dispatch) {
      this.dispatch(addNotification(notification));
    }

    // Show alert for foreground notifications
    if (remoteMessage.notification) {
      Alert.alert(
        remoteMessage.notification.title || 'Notification',
        remoteMessage.notification.body || '',
        [
          {
            text: 'View',
            onPress: () => this.handleNotificationPress(remoteMessage),
          },
          {
            text: 'Dismiss',
            style: 'cancel',
          },
        ]
      );
    }
  }

  /**
   * Handle notification that opened the app from background
   */
  private handleNotificationOpenedApp(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    console.log('Notification opened app from background:', remoteMessage);
    
    const notification = this.createNotificationFromFCM(remoteMessage);
    
    if (this.dispatch) {
      this.dispatch(addNotification(notification));
    }

    // Navigate to appropriate screen
    this.handleNotificationPress(remoteMessage);
  }

  /**
   * Handle notification when app was opened from quit state
   */
  private handleInitialNotification(remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) {
    if (remoteMessage) {
      console.log('Notification opened app from quit state:', remoteMessage);
      
      const notification = this.createNotificationFromFCM(remoteMessage);
      
      if (this.dispatch) {
        this.dispatch(addNotification(notification));
      }

      // Navigate to appropriate screen after a delay to ensure navigation is ready
      setTimeout(() => {
        this.handleNotificationPress(remoteMessage);
      }, 2000);
    }
  }

  /**
   * Create notification object from FCM message
   */
  private createNotificationFromFCM(remoteMessage: FirebaseMessagingTypes.RemoteMessage): Notification {
    return {
      id: remoteMessage.messageId || Date.now().toString(),
      title: remoteMessage.notification?.title || 'New Notification',
      body: remoteMessage.notification?.body || '',
      data: remoteMessage.data,
      timestamp: Date.now(),
      read: false,
      type: remoteMessage.data?.type as any || 'info',
    };
  }

  /**
   * Handle notification press - navigate to appropriate screen
   */
  private handleNotificationPress(remoteMessage: FirebaseMessagingTypes.RemoteMessage) {
    const { data } = remoteMessage;
    
    if (!navigationRef.current) {
      console.warn('Navigation ref not available');
      return;
    }

    // Navigate based on notification data
    if (data?.screen) {
      switch (data.screen) {
        case 'Notifications':
          navigationRef.current.navigate('Notifications' as never);
          break;
        case 'ServiceDetail':
          if (data.serviceId) {
            navigationRef.current.navigate('ServiceDetail' as never, { 
              serviceId: data.serviceId 
            } as never);
          }
          break;
        default:
          // Navigate to notifications screen by default
          navigationRef.current.navigate('Notifications' as never);
      }
    } else {
      // Default navigation to notifications screen
      navigationRef.current.navigate('Notifications' as never);
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermissions(): Promise<boolean> {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Notification permission granted');
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
   * Get FCM token
   */
  async getToken(): Promise<string | null> {
    try {
      // Request permission first on iOS
      if (Platform.OS === 'ios') {
        const hasPermission = await this.requestPermissions();
        if (!hasPermission) {
          return null;
        }
      }

      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }
}

export const notificationService = new NotificationService();