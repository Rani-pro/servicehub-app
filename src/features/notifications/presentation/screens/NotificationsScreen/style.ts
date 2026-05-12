import { StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../../../../shared/theme/theme';

export const getStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      padding: Spacing.m,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    headerActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: Spacing.m,
      paddingHorizontal: Spacing.xs,
    },
    actionButton: {
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.s,
      borderRadius: 8,
      backgroundColor: colors.secondaryBackground,
    },
    disabledButton: {
      opacity: 0.5,
    },
    actionButtonText: {
      ...Typography.bodySmall,
      color: colors.primary,
      fontWeight: '600',
    },
    disabledText: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
    },
    clearButtonText: {
      ...Typography.bodySmall,
      color: colors.danger,
      fontWeight: '600',
    },
    notificationItem: {
      backgroundColor: colors.secondaryBackground,
      borderRadius: 12,
      marginBottom: Spacing.s,
      padding: Spacing.m,
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
      marginBottom: Spacing.s,
    },
    notificationTime: {
      ...Typography.caption,
      color: colors.textSecondary,
      marginLeft: Spacing.s,
      flex: 1,
    },
    deleteButton: {
      padding: Spacing.xs,
    },
    notificationTitle: {
      ...Typography.body,
      fontWeight: '600',
      marginBottom: Spacing.xs,
      color: colors.text,
    },
    unreadText: {
      fontWeight: '700',
    },
    notificationBody: {
      ...Typography.bodySmall,
      color: colors.textSecondary,
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
      paddingVertical: Spacing.xxl,
    },
    emptyTitle: {
      ...Typography.h4,
      marginTop: Spacing.m,
      marginBottom: Spacing.s,
      color: colors.text,
    },
    emptyMessage: {
      ...Typography.body,
      textAlign: 'center',
      color: colors.textSecondary,
      paddingHorizontal: Spacing.xl,
    },
  });
