import { useAppSelector, useAppDispatch } from './reduxHooks';
import { 
  markAsRead, 
  markAllAsRead, 
  removeNotification, 
  clearAllNotifications,
  addNotification,
  Notification 
} from '../../features/notifications/store/notificationSlice';
import { notificationService } from '../../core/notificationService';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, isLoading, error } = useAppSelector(
    (state) => state.notifications
  );

  const markNotificationAsRead = (notificationId: string) => {
    dispatch(markAsRead(notificationId));
  };

  const markAllNotificationsAsRead = () => {
    dispatch(markAllAsRead());
  };

  const deleteNotification = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  const clearAllNotifications = () => {
    dispatch(clearAllNotifications());
  };

  const createLocalNotification = (
    title: string, 
    body: string, 
    data?: Record<string, any>
  ) => {
    notificationService.createLocalNotification(title, body, data);
  };

  const addNotificationToStore = (notification: Notification) => {
    dispatch(addNotification(notification));
  };

  return {
    // State
    notifications,
    unreadCount,
    isLoading,
    error,
    
    // Actions
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    clearAllNotifications,
    createLocalNotification,
    addNotificationToStore,
  };
};