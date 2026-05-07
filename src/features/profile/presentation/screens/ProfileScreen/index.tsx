import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useMemo } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerParamList } from '../../../../../navigation/navigationTypes';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { Spacing } from '../../../../../shared/theme/theme';
import { getStyles } from './style';

const ProfileScreen = () => {
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const { colors, isDark } = useTheme();
    const { isSmallDevice, isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();

    // Re-compute styles on orientation change
    const styles = useMemo(
        () => getStyles(colors, Spacing, isLandscape),
        [colors, isLandscape, screenWidth],
    );

    const { user } = useAppSelector((state) => state.auth);

    const menuItems = [
        {
            title: 'Edit Profile',
            subtitle: 'Update your personal information',
            icon: 'account-edit',
            onPress: () => console.log('Edit Profile'),
            color: colors.primary,
        },
        {
            title: 'Account Settings',
            subtitle: 'Privacy, security, and preferences',
            icon: 'cog',
            onPress: () => navigation.navigate('Settings'),
            color: '#3B82F6',
        },
        {
            title: 'Notifications',
            subtitle: 'Manage your notification preferences',
            icon: 'bell-outline',
            onPress: () => console.log('Notifications'),
            color: '#F59E0B',
        },
        {
            title: 'Help & Support',
            subtitle: 'Get help and contact support',
            icon: 'help-circle',
            onPress: () => console.log('Help & Support'),
            color: '#8B5CF6',
        },
        {
            title: 'About',
            subtitle: 'App version and information',
            icon: 'information',
            onPress: () => console.log('About'),
            color: '#06B6D4',
        },
    ];

    const getUserDisplayName = () => {
        return user?.displayName || user?.email?.split('@')[0] || 'User';
    };

    const getUserEmail = () => {
        return user?.email || 'No email provided';
    };

    const renderMenuItem = (item: typeof menuItems[0], index: number) => (
        <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <Icon
                    name={item.icon}
                    size={isSmallDevice || isLandscape ? 20 : 24}
                    color={item.color}
                />
            </View>
            <View style={styles.menuContent}>
                <ResponsiveText
                    variant={isSmallDevice || isLandscape ? 'body' : 'h4'}
                    style={styles.menuText}
                >
                    {item.title}
                </ResponsiveText>
                <ResponsiveText variant="bodySmall" style={styles.menuSubtext}>
                    {item.subtitle}
                </ResponsiveText>
            </View>
            <Icon
                name="chevron-right"
                size={20}
                color={colors.textSecondary}
                style={styles.chevron}
            />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            {/* Header */}
            <CommonHeader
                title="Profile"
                leftElement="menu"
                rightElement="more"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Math.max(Spacing.s, insets.bottom + Spacing.xs),
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                }}
            >
                {/* Profile Card - landscape mein horizontal layout */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Icon
                            name="account"
                            size={isLandscape ? 30 : (isSmallDevice ? 40 : 50)}
                            color={colors.primary}
                        />
                    </View>
                    <View style={styles.profileInfo}>
                        <ResponsiveText
                            variant={isLandscape ? 'h4' : (isSmallDevice ? 'h3' : 'h2')}
                            style={styles.userName}
                        >
                            {getUserDisplayName()}
                        </ResponsiveText>
                        <ResponsiveText variant="body" style={styles.userEmail}>
                            {getUserEmail()}
                        </ResponsiveText>
                    </View>
                </View>

                {/* Stats */}
                <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                        <ResponsiveText variant="h3" style={styles.statNumber}>
                            12
                        </ResponsiveText>
                        <ResponsiveText variant="caption" style={styles.statLabel} numberOfLines={2}>
                            Services Booked
                        </ResponsiveText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <ResponsiveText variant="h3" style={styles.statNumber}>
                            4.8
                        </ResponsiveText>
                        <ResponsiveText variant="caption" style={styles.statLabel} numberOfLines={2}>
                            Average Rating
                        </ResponsiveText>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <ResponsiveText variant="h3" style={styles.statNumber}>
                            2
                        </ResponsiveText>
                        <ResponsiveText variant="caption" style={styles.statLabel} numberOfLines={2}>
                            Years Active
                        </ResponsiveText>
                    </View>
                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Account
                    </ResponsiveText>
                    {menuItems.map(renderMenuItem)}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;