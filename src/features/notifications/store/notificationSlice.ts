import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationModel, NotificationStateData } from '../../../shared/schema';

const initialState: NotificationStateData = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    addNotification: (state, action: PayloadAction<NotificationModel>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach(notification => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        const notification = state.notifications[index];
        if (!notification.read) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
        state.notifications.splice(index, 1);
      }
    },
    setNotifications: (state, action: PayloadAction<NotificationModel[]>) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter(n => !n.read).length;
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
  },
});

export const {
  setLoading,
  setError,
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  setNotifications,
  clearAllNotifications,
} = notificationSlice.actions;

// Re-export types for convenience
export type { NotificationModel } from '../../../shared/schema';

export default notificationSlice.reducer;