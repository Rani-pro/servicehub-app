import React from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector, useAppDispatch } from '../../../../../shared/hooks/reduxHooks';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import {
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
} from '../../../store/notificationSlice';
import { Notification } from '../../../types';
import { getStyles } from './style';

const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();
  const styles = getStyles(colors);
  
  const { notifications, unreadCount, isLoading } = useAppSelector(
    state => state.notifications
  );

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    
    // Handle navigation based on notification data
    if (notification.data?.screen) {
      // Add navigation logic here based on your app's needs
      console.log('Navigate to:', notification.data.screen);
    }
  };

  const handleMarkAllAsRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllAsRead());
    }
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Notifications',
      'Are you sure you want to clear all notifications?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear All',
          style: 'destructive',
          onPress: () => dispatch(clearAllNotifications()),
        },
      ]
    );
  };

  const handleDeleteNotification = (notificationId: string) => {
    dispatch(removeNotification(notificationId));
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'alert-circle';
      case 'error':
        return 'close-circle';
      default:
        return 'information';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return colors.danger;
      case 'error':
        return colors.danger;
      default:
        return colors.primary;
    }
  };

  const renderNotificationItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Icon
            name={getNotificationIcon(item.type || 'info')}
            size={20}
            color={getNotificationColor(item.type || 'info')}
          />
          <Text style={styles.notificationTime}>
            {formatTime(item.timestamp)}
          </Text>
          <TouchableOpacity
            onPress={() => handleDeleteNotification(item.id)}
            style={styles.deleteButton}
          >
            <Icon name="close" size={16} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>
        
        <ResponsiveText
          variant="body"
          style={StyleSheet.flatten([
            styles.notificationTitle,
            !item.read && styles.unreadText,
          ])}
        >
          {item.title}
        </ResponsiveText>
        
        <ResponsiveText
          variant="bodySmall"
          style={styles.notificationBody}
        >
          {item.body}
        </ResponsiveText>
        
        {!item.read && <View style={styles.unreadDot} />}
      </View>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon name="bell-outline" size={64} color={colors.textSecondary} />
      <ResponsiveText variant="h4" style={styles.emptyTitle}>
        No Notifications
      </ResponsiveText>
      <ResponsiveText variant="body" style={styles.emptyMessage}>
        You're all caught up! New notifications will appear here.
      </ResponsiveText>
    </View>
  );

  const renderHeader = () => {
    if (notifications.length === 0) return null;
    
    return (
      <View style={styles.headerActions}>
        <TouchableOpacity
          onPress={handleMarkAllAsRead}
          disabled={unreadCount === 0}
          style={[
            styles.actionButton,
            unreadCount === 0 && styles.disabledButton,
          ]}
        >
          <ResponsiveText
            variant="body"
            style={StyleSheet.flatten([
              styles.actionButtonText,
              unreadCount === 0 && styles.disabledText,
            ])}
          >
            Mark All Read
          </ResponsiveText>
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={handleClearAll}
          style={styles.actionButton}
        >
          <ResponsiveText variant="body" style={styles.clearButtonText}>
            Clear All
          </ResponsiveText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Notifications"
        leftElement="back"
        backgroundColor="white"
      />
      
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderNotificationItem}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              // Add refresh logic here if needed
            }}
            colors={[colors.primary]}
          />
        }
        contentContainerStyle={[
          styles.listContainer,
          notifications.length === 0 && styles.emptyContainer,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default NotificationsScreen;