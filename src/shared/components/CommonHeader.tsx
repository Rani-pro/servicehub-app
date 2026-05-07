import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { useAppSelector } from '../hooks/reduxHooks';
import { useResponsive } from '../hooks/useResponsive';
import ResponsiveText from './ResponsiveText';
import { Spacing, ComponentSizes, Shadows } from '../theme/theme';

export interface CommonHeaderProps {
  title?: string;
  subtitle?: string;
  leftElement?: 'menu' | 'back' | 'none';
  rightElement?: 'notification' | 'menu' | 'search' | 'more' | 'none';
  backgroundColor?: 'white' | 'primary' | 'transparent';
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showNotificationBadge?: boolean;
  rightIcon?: string;
  leftIcon?: string;
}

const getStyles = (colors: any, backgroundColor: 'white' | 'primary' | 'transparent', isLandscape: boolean) => {
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
      paddingVertical: isLandscape ? 4 : Spacing.xs,
      backgroundColor: headerBackgroundColor,
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

export const CommonHeader: React.FC<CommonHeaderProps> = ({
  title,
  subtitle,
  leftElement = 'menu',
  rightElement = 'none',
  backgroundColor = 'white',
  onLeftPress,
  onRightPress,
  showNotificationBadge = false,
  rightIcon,
  leftIcon,
}) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const { unreadCount } = useAppSelector((state) => state.notifications);
  const { isLandscape } = useResponsive();
  const styles = getStyles(colors, backgroundColor, isLandscape);

  const shouldShowBadge = rightElement === 'notification' && (unreadCount > 0 || showNotificationBadge);

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else if (leftElement === 'menu') {
      navigation.dispatch(DrawerActions.openDrawer());
    } else if (leftElement === 'back') {
      navigation.goBack();
    }
  };

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    } else if (rightElement === 'notification') {
      navigation.navigate('Notifications' as never);
    } else if (rightElement === 'menu') {
      navigation.dispatch(DrawerActions.openDrawer());
    }
  };

  const renderLeftElement = () => {
    if (leftElement === 'none') return <View style={styles.placeholder} />;
    const iconName = leftIcon || (leftElement === 'menu' ? 'menu' : 'arrow-left');
    return (
      <TouchableOpacity onPress={handleLeftPress} style={styles.actionButton}>
        <Icon name={iconName} size={24} color={styles.iconColor.color} />
      </TouchableOpacity>
    );
  };

  const renderCenterElement = () => {
    if (subtitle) {
      return (
        <View style={styles.centerContent}>
          <ResponsiveText variant="bodySmall" color={styles.subtitleColor.color}>
            {subtitle}
          </ResponsiveText>
          <ResponsiveText
            variant="h4"
            style={styles.titleText}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </ResponsiveText>
        </View>
      );
    }
    return (
      <View style={styles.centerContent}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
      </View>
    );
  };

  const renderRightElement = () => {
    if (rightElement === 'none') return <View style={styles.placeholder} />;
    let iconName = 'menu';
    if (rightIcon) {
      iconName = rightIcon;
    } else {
      switch (rightElement) {
        case 'notification':
          iconName = 'bell-outline';
          break;
        case 'search':
          iconName = 'magnify';
          break;
        case 'more':
          iconName = 'dots-vertical';
          break;
        default:
          iconName = 'menu';
      }
    }
    return (
      <TouchableOpacity onPress={handleRightPress} style={styles.actionButton}>
        <Icon name={iconName} size={24} color={styles.iconColor.color} />
        {shouldShowBadge && (
          <View style={styles.notificationBadge}>
            {unreadCount > 0 && unreadCount < 100 && (
              <Text style={styles.badgeText}>{unreadCount}</Text>
            )}
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        {renderLeftElement()}
        {renderCenterElement()}
        {renderRightElement()}
      </View>
    </SafeAreaView>
  );
};
