import { StyleSheet } from 'react-native';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      padding: 16,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headerActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
      paddingHorizontal: 4,
    },
    actionButton: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      backgroundColor: colors.secondaryBackground,
    },
    disabledButton: {
      opacity: 0.5,
    },
    actionButtonText: {
      color: colors.primary,
      fontWeight: '600',
    },
    disabledText: {
      color: colors.textSecondary,
    },
    clearButtonText: {
      color: colors.danger,
      fontWeight: '600',
    },
    notificationItem: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: 12,
      marginBottom: 12,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unreadNotification: {
      borderColor: colors.primary,
      borderWidth: 2,
    },
    notificationContent: {
      position: 'relative',
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    notificationTime: {
      fontSize: 12,
      color: colors.textSecondary,
      marginLeft: 8,
      flex: 1,
    },
    deleteButton: {
      padding: 4,
    },
    notificationTitle: {
      fontWeight: '600',
      marginBottom: 4,
      color: colors.text,
    },
    unreadText: {
      fontWeight: '700',
    },
    notificationBody: {
      color: colors.textSecondary,
      lineHeight: 20,
    },
    unreadDot: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    emptyState: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 64,
    },
    emptyTitle: {
      marginTop: 16,
      marginBottom: 8,
      color: colors.text,
    },
    emptyMessage: {
      textAlign: 'center',
      color: colors.textSecondary,
      paddingHorizontal: 32,
    },
  });