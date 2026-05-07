import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows, Spacing } from '../../theme/theme';
import type { BackgroundType } from './constants';
import { BADGE_MIN_WIDTH, BADGE_SIZE, BUTTON_SIZE } from './constants';

export const getStyles = (
  colors: any,
  backgroundColor: BackgroundType,
  isLandscape: boolean,
) => {
  const isWhite = backgroundColor === 'white';
  const isTransparent = backgroundColor === 'transparent';

  const bgColor = isTransparent
    ? 'transparent'
    : isWhite
    ? colors.white
    : colors.primary;

  const textColor = isWhite ? colors.text : colors.white;
  const iconColor = isWhite ? colors.text : colors.white;
  const subtitleColor = isWhite ? colors.textSecondary : colors.white;

  return StyleSheet.create({
    safeArea: {
      backgroundColor: bgColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      // No horizontal padding here — inset padding applied inline so
      // left/right safe-area gaps are fully covered on rotation.
      paddingVertical: isLandscape ? 4 : Spacing.xs,
      backgroundColor: bgColor,
      elevation: isTransparent ? 0 : isWhite ? 2 : 4,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isTransparent ? 0 : isWhite ? 0.1 : 0.2,
      shadowRadius: 4,
      ...(!isWhite && !isTransparent && Shadows.medium),
    },
    actionButton: {
      width: BUTTON_SIZE,
      height: BUTTON_SIZE,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: ComponentSizes.button.borderRadius,
      backgroundColor: isWhite ? colors.secondaryBackground : 'transparent',
      position: 'relative',
      // Fixed horizontal margin so buttons never touch the edge
      marginHorizontal: Spacing.xs,
    },
    centerContent: {
      flex: 1,
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
    subtitleText: {
      color: subtitleColor,
    },
    iconColor: {
      color: iconColor,
    },
    notificationBadge: {
      position: 'absolute',
      top: 6,
      right: 6,
      minWidth: BADGE_MIN_WIDTH,
      height: BADGE_SIZE,
      borderRadius: BADGE_SIZE / 2,
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
  });
};
