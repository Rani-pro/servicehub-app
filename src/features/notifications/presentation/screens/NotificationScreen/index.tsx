import React, { useEffect, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import Card from '../../../../../shared/components/Card';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { Notification, markAsRead, markAllAsRead, removeNotification, clearAllNotifications } from '../../../store/notificationSlice';
import { getStyles } from './style';
import { Spacing, ComponentSizes } from '../../../../../shared/theme/theme';

const NotificationScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { isSmallDevice } = useResponsive();
  const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
  
  const { notifications, unreadCount } = useAppSelector((state) => state.notifications);

  const handleNotificationPress = (notification: Notification) => {
    if (!notification.read) {
      dispatch(markAsRead(notification.id));
    }
    
    // Handle navigation based on notification data
    if (notification.data?.screen) {
      navigation.navigate(notification.data.screen as any, notification.data.params as any);
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

  const getNotificationIcon = (type?: string) => {
    switch (type) {
      case 'success':
        return 'check-circle';
      case 'warning':
        return 'alert-circle';
      case 'error':
        return 'close-circle';
      default:
        return 'bell';
    }
  };

  const getNotificationColor = (type?: string) => {
    switch (type) {
      case 'success':
        return colors.success;
      case 'warning':
        return '#F59E0B';
      case 'error':
        return colors.danger;
      default:
        return colors.primary;
    }
  };

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Card 
      padding="medium" 
      shadow="small" 
      style={!item.read ? 
        [styles.notificationCard, styles.unreadCard] as any : 
        styles.notificationCard
      }
    >
      <TouchableOpacity
        onPress={() => handleNotificationPress(item)}
        style={styles.notificationContent}
        activeOpacity={0.7}
      >
        <View style={styles.notificationHeader}>
          <View style={styles.iconContainer}>
            <Icon
              name={getNotificationIcon(item.type)}
              size={ComponentSizes.icon.medium}
              color={getNotificationColor(item.type)}
            />
          </View>
          <View style={styles.notificationInfo}>
            <ResponsiveText
              variant={isSmallDevice ? "body" : "h4"}
              style={!item.read ? 
                [styles.notificationTitle, styles.unreadTitle] as any : 
                styles.notificationTitle
              }
              numberOfLines={2}
            >
              {item.title}
            </ResponsiveText>
            <ResponsiveText
              variant="bodySmall"
              color={colors.textSecondary}
              numberOfLines={3}
              style={styles.notificationBody}
            >
              {item.body}
            </ResponsiveText>
            <ResponsiveText
              variant="caption"
              color={colors.textSecondary}
              style={styles.timestamp}
            >
              {formatTimestamp(item.timestamp)}
            </ResponsiveText>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteNotification(item.id)}
            style={styles.deleteButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon
              name="close"
              size={ComponentSizes.icon.small}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        </View>
        {!item.read && <View style={styles.unreadIndicator} />}
      </TouchableOpacity>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Icon
        name="bell-outline"
        size={ComponentSizes.icon.xlarge * 2}
        color={colors.textSecondary}
      />
      <ResponsiveText
        variant="h4"
        color={colors.textSecondary}
        style={styles.emptyTitle}
      >
        No Notifications
      </ResponsiveText>
      <ResponsiveText
        variant="body"
        color={colors.textSecondary}
        style={styles.emptyMessage}
        align="center"
      >
        You're all caught up! New notifications will appear here.
      </ResponsiveText>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerActions}>
      {unreadCount > 0 && (
        <TouchableOpacity
          onPress={handleMarkAllAsRead}
          style={styles.actionButton}
        >
          <ResponsiveText variant="bodySmall" color={colors.primary}>
            Mark all as read
          </ResponsiveText>
        </TouchableOpacity>
      )}
      {notifications.length > 0 && (
        <TouchableOpacity
          onPress={handleClearAll}
          style={styles.actionButton}
        >
          <ResponsiveText variant="bodySmall" color={colors.danger}>
            Clear all
          </ResponsiveText>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <CommonHeader
        title="Notifications"
        leftElement="back"
        rightElement={notifications.length > 0 ? "more" : "none"}
        onRightPress={() => {
          // Show action sheet or menu for bulk actions
        }}
      />
      
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={notifications.length > 0 ? renderHeader : null}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;