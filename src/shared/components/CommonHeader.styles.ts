import { StyleSheet } from 'react-native';
import { Spacing, ComponentSizes, Shadows } from '../theme/theme';

export const getStyles = (colors: any, backgroundColor: 'white' | 'primary' | 'transparent') => {
  const isWhiteBackground = backgroundColor === 'white';
  const isTransparent = backgroundColor === 'transparent';
  const headerBackgroundColor = isTransparent ? 'transparent' : (isWhiteBackground ? colors.white : colors.primary);
  const textColor = isWhiteBackground ? colors.text : colors.white;
  const iconColor = isWhiteBackground ? colors.text : colors.white;
  const subtitleColor = isWhiteBackground ? colors.textSecondary : colors.white;

  return StyleSheet.create({
    safeArea: {
      backgroundColor: headerBackgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: Spacing.m,
      paddingVertical: Spacing.xs,
      backgroundColor: headerBackgroundColor,
      borderBottomWidth: isWhiteBackground ? 1 : 0,
      borderBottomColor: colors.border,
      elevation: isTransparent ? 0 : (isWhiteBackground ? 2 : 4),
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isTransparent ? 0 : (isWhiteBackground ? 0.1 : 0.2),
      shadowRadius: 4,
      ...(!isWhiteBackground && !isTransparent && Shadows.medium),
    },
    actionButton: {
      padding: Spacing.xs,
      borderRadius: ComponentSizes.button.borderRadius,
      backgroundColor: isWhiteBackground ? colors.secondaryBackground : 'transparent',
      position: 'relative',
    },
    centerContent: {
      flex: 1,
      marginHorizontal: Spacing.m,
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      color: textColor,
      textAlign: 'center',
    },
    titleText: {
      color: textColor,
      textAlign: 'center',
      fontWeight: '600',
    },
    placeholder: {
      width: 40,
      height: 40,
    },
    notificationBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      minWidth: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.danger,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 4,
    },
    badgeText: {
      color: 'white',
      fontSize: 10,
      fontWeight: '600',
      textAlign: 'center',
    },
    iconColor: {
      color: iconColor,
    },
    subtitleColor: {
      color: subtitleColor,
    },
  });
};