import { StyleSheet } from 'react-native';

export const getStyles = (colors: any, spacing: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      flexGrow: 1,
      padding: spacing.m,
    },
    headerActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: spacing.m,
      gap: spacing.m,
    },
    actionButton: {
      paddingHorizontal: spacing.s,
      paddingVertical: spacing.xs,
    },
    notificationCard: {
      marginBottom: spacing.s,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.border,
    },
    unreadCard: {
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
      backgroundColor: colors.primary + '05',
    },
    notificationContent: {
      position: 'relative',
    },
    notificationHeader: {
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.secondaryBackground,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.m,
    },
    notificationInfo: {
      flex: 1,
      marginRight: spacing.s,
    },
    notificationTitle: {
      marginBottom: spacing.xs,
      fontWeight: '500',
    },
    unreadTitle: {
      fontWeight: '600',
      color: colors.text,
    },
    notificationBody: {
      marginBottom: spacing.xs,
      lineHeight: 20,
    },
    timestamp: {
      marginTop: spacing.xs,
    },
    deleteButton: {
      padding: spacing.xs,
      borderRadius: 12,
      backgroundColor: colors.secondaryBackground,
    },
    unreadIndicator: {
      position: 'absolute',
      top: 0,
      right: 0,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },
    separator: {
      height: spacing.xs,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.xl,
      paddingVertical: spacing.xxl,
    },
    emptyTitle: {
      marginTop: spacing.l,
      marginBottom: spacing.s,
    },
    emptyMessage: {
      lineHeight: 24,
    },
  });