import { AppDispatch } from '../../../store/store';
import { addNotification } from '../store/notificationSlice';
import { Notification } from '../types';

/**
 * Test function to add sample notifications for development
 */
export const addTestNotification = (dispatch: AppDispatch) => {
  const testNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
    {
      title: 'Welcome to ServiceHub!',
      body: 'Thank you for joining us. Explore our services and book your first appointment.',
      type: 'success',
      read: false,
      data: { screen: 'Services' },
    },
    {
      title: 'Service Reminder',
      body: 'Your car service is scheduled for tomorrow at 10:00 AM.',
      type: 'info',
      read: false,
      data: { screen: 'ServiceDetail', serviceId: '123' },
    },
    {
      title: 'Payment Successful',
      body: 'Your payment of $150 has been processed successfully.',
      type: 'success',
      read: false,
    },
    {
      title: 'Profile Update Required',
      body: 'Please update your profile information to continue using our services.',
      type: 'warning',
      read: false,
      data: { screen: 'Profile' },
    },
  ];

  // Add a random test notification
  const randomNotification = testNotifications[Math.floor(Math.random() * testNotifications.length)];
  
  const notification: Notification = {
    ...randomNotification,
    id: Date.now().toString(),
    timestamp: Date.now(),
  };

  dispatch(addNotification(notification));
};

/**
 * Add multiple test notifications
 */
export const addMultipleTestNotifications = (dispatch: AppDispatch, count: number = 3) => {
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      addTestNotification(dispatch);
    }, i * 1000); // Add notifications with 1 second delay
  }
};