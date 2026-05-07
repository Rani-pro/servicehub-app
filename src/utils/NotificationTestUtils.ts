import { notificationService } from '../core/notificationService';

/**
 * Utility functions for testing notifications in development
 * These functions help developers test the notification system
 */

export const NotificationTestUtils = {
  /**
   * Create a test notification
   */
  createTestNotification: () => {
    notificationService.createLocalNotification(
      'Test Notification',
      'This is a test notification to verify the system is working correctly.',
      {
        type: 'info',
        screen: 'Home',
      }
    );
  },

  /**
   * Create multiple test notifications
   */
  createMultipleTestNotifications: () => {
    const notifications = [
      {
        title: 'Welcome!',
        body: 'Welcome to the app! Explore all the features.',
        type: 'success',
        screen: 'Home',
      },
      {
        title: 'Service Update',
        body: 'Your service request has been updated.',
        type: 'info',
        screen: 'Services',
      },
      {
        title: 'Profile Incomplete',
        body: 'Please complete your profile to get better recommendations.',
        type: 'warning',
        screen: 'Profile',
      },
      {
        title: 'Payment Failed',
        body: 'Your payment could not be processed. Please try again.',
        type: 'error',
        screen: 'Settings',
      },
    ];

    notifications.forEach((notification, index) => {
      setTimeout(() => {
        notificationService.createLocalNotification(
          notification.title,
          notification.body,
          {
            type: notification.type,
            screen: notification.screen,
          }
        );
      }, index * 1000); // Stagger notifications by 1 second
    });
  },

  /**
   * Create a notification with navigation data
   */
  createNavigationNotification: (screen: string, params?: any) => {
    notificationService.createLocalNotification(
      'Navigation Test',
      `Tap to navigate to ${screen}`,
      {
        type: 'info',
        screen,
        params,
      }
    );
  },

  /**
   * Simulate different notification types
   */
  testNotificationTypes: () => {
    const types = [
      { type: 'success', title: 'Success!', body: 'Operation completed successfully.' },
      { type: 'info', title: 'Information', body: 'Here is some important information.' },
      { type: 'warning', title: 'Warning', body: 'Please pay attention to this warning.' },
      { type: 'error', title: 'Error', body: 'Something went wrong. Please try again.' },
    ];

    types.forEach((notification, index) => {
      setTimeout(() => {
        notificationService.createLocalNotification(
          notification.title,
          notification.body,
          { type: notification.type }
        );
      }, index * 500);
    });
  },
};

// Make it available globally in development
if (__DEV__) {
  (global as any).NotificationTestUtils = NotificationTestUtils;
  console.log('🔔 NotificationTestUtils available globally in development');
  console.log('Usage:');
  console.log('  NotificationTestUtils.createTestNotification()');
  console.log('  NotificationTestUtils.createMultipleTestNotifications()');
  console.log('  NotificationTestUtils.testNotificationTypes()');
}