import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAppSelector } from '../../hooks/reduxHooks';
import { useResponsive } from '../../hooks/useResponsive';
import { useTheme } from '../../hooks/useTheme';
import ResponsiveText from '../ResponsiveText';
import { ICON_SIZE, RIGHT_ICON_MAP, type CommonHeaderProps } from './constants';
import { getStyles } from './styles';

export type { CommonHeaderProps } from './constants';

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
  const insets = useSafeAreaInsets();
  const styles = getStyles(colors, backgroundColor, isLandscape);

  const shouldShowBadge =
    rightElement === 'notification' && (unreadCount > 0 || showNotificationBadge);

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
    if (leftElement === 'none') {
      return <View style={{ width: 40, height: 40, marginHorizontal: 8 }} />;
    }
    const iconName = leftIcon || (leftElement === 'menu' ? 'menu' : 'arrow-left');
    return (
      <TouchableOpacity onPress={handleLeftPress} style={styles.actionButton}>
        <Icon name={iconName} size={ICON_SIZE} color={styles.iconColor.color} />
      </TouchableOpacity>
    );
  };

  const renderCenterElement = () => {
    if (subtitle) {
      return (
        <View style={styles.centerContent}>
          <ResponsiveText variant="bodySmall" color={styles.subtitleText.color}>
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
    if (rightElement === 'none') {
      return <View style={{ width: 40, height: 40, marginHorizontal: 8 }} />;
    }
    const iconName = rightIcon ?? RIGHT_ICON_MAP[rightElement] ?? 'menu';
    return (
      <TouchableOpacity onPress={handleRightPress} style={styles.actionButton}>
        <Icon name={iconName} size={ICON_SIZE} color={styles.iconColor.color} />
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
    // safeArea covers top + left/right insets (background color fills notch area)
    <View
      style={[
        styles.safeArea,
        {
          paddingTop: insets.top,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      <View style={styles.header}>
        {renderLeftElement()}
        {renderCenterElement()}
        {renderRightElement()}
      </View>
    </View>
  );
};
