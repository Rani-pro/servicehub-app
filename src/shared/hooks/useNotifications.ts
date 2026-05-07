import { notificationService } from '../../core/notificationService';
import { addNotification, clearAllNotifications as clearAllNotificationsAction, markAllAsRead, markAsRead, NotificationModel, removeNotification } from '../../features/notifications/store/notificationSlice';
import { useAppDispatch, useAppSelector } from './reduxHooks';

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
    dispatch(clearAllNotificationsAction());
  };

  const createLocalNotification = (
    title: string,
    body: string,
    data?: Record<string, any>
  ) => {
    notificationService.createLocalNotification(title, body, data);
  };

  const addNotificationToStore = (notification: NotificationModel) => {
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