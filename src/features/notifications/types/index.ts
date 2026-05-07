export interface Notification {
  id: string;
  title: string;
  body: string;
  data?: Record<string, any>;
  timestamp: number;
  read: boolean;
  type?: 'info' | 'warning' | 'error' | 'success';
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
}

export interface FCMMessage {
  messageId?: string;
  data?: Record<string, any>;
  notification?: {
    title?: string;
    body?: string;
    android?: {
      channelId?: string;
      smallIcon?: string;
      color?: string;
    };
    ios?: {
      badge?: string;
      sound?: string;
    };
  };
}