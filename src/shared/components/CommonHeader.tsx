import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useTheme } from '../hooks/useTheme';
import { useAppSelector } from '../hooks/reduxHooks';
import ResponsiveText from './ResponsiveText';
import { getStyles } from './CommonHeader.styles.ts';

export interface CommonHeaderProps {
  title?: string;
  subtitle?: string;
  leftElement?: 'menu' | 'back' | 'none';
  rightElement?: 'notification' | 'menu' | 'search' | 'more' | 'none';
  backgroundColor?: 'white' | 'primary' | 'transparent';
  onLeftPress?: () => void;
  onRightPress?: () => void;
  showNotificationBadge?: boolean;
  rightIcon?: string; // Custom icon name for right element
  leftIcon?: string;  // Custom icon name for left element
}

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
  const styles = getStyles(colors, backgroundColor);
  
  // Show badge if there are unread notifications or if explicitly requested
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        {renderLeftElement()}
        {renderCenterElement()}
        {renderRightElement()}
      </View>
    </SafeAreaView>
  );
};