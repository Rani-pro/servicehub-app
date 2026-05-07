import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import { ScrollView, StatusBar, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomTabParamList, DrawerParamList } from '../../../../../navigation/navigationTypes';
import Card from '../../../../../shared/components/Card';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import Grid from '../../../../../shared/components/Grid';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useScreenOrientation } from '../../../../../shared/hooks/useScreenOrientation';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { ComponentSizes, Spacing } from '../../../../../shared/theme/theme';
import { getStyles } from './style';

import { DashboardStatsModel, DashboardStatsSchema } from '../../../../../shared/schema';

type NavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    DrawerNavigationProp<DrawerParamList>
>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { colors, isDark } = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const { isTablet, isSmallDevice, isLandscape, screenWidth } = useResponsive();
    const orientation = useScreenOrientation();

    const [dashboardStats] = useState<DashboardStatsModel>(
        DashboardStatsSchema.parse({
            totalBookings: 12,
            activeServices: 24,
            unreadNotifications: 3,
            revenue: 4.8 // Example rating placeholder mapped to revenue for now
        })
    );

    // Dynamically compute columns based on orientation + device type
    const numColumns = isTablet ? (isLandscape ? 4 : 3) : (isLandscape ? 3 : 2);

    // Pass screenWidth & orientation to force re-calculation when device rotates
    const styles = useMemo(() => getStyles(colors, Spacing, isLandscape), [colors, screenWidth, orientation, isLandscape]);

    const menuItems = [
        {
            title: 'Profile',
            icon: 'account-circle',
            onPress: () => navigation.navigate('Profile'),
            color: colors.primary,
            gradient: ['#22C55E', '#16A34A'],
        },
        {
            title: 'Services',
            icon: 'tools',
            onPress: () => navigation.navigate('Services'),
            color: '#3B82F6',
            gradient: ['#3B82F6', '#1D4ED8'],
        },
        {
            title: 'Settings',
            icon: 'cog',
            onPress: () => navigation.navigate('Settings'),
            color: '#8B5CF6',
            gradient: ['#8B5CF6', '#7C3AED'],
        },
        {
            title: 'Support',
            icon: 'help-circle',
            onPress: () => console.log('Support Pressed'),
            color: '#F59E0B',
            gradient: ['#F59E0B', '#D97706'],
        },
        {
            title: 'About',
            icon: 'information',
            onPress: () => console.log('About Pressed'),
            color: '#EF4444',
            gradient: ['#EF4444', '#DC2626'],
        },
        {
            title: 'Feedback',
            icon: 'message-text',
            onPress: () => console.log('Feedback Pressed'),
            color: '#06B6D4',
            gradient: ['#06B6D4', '#0891B2'],
        },
    ];

    const quickActions = [
        {
            title: 'Book Service',
            icon: 'calendar-plus',
            onPress: () => console.log('Book Service'),
            color: colors.primary,
        },
        {
            title: 'My Orders',
            icon: 'clipboard-list',
            onPress: () => console.log('My Orders'),
            color: '#3B82F6',
        },
    ];

    const renderMenuItem = (item: typeof menuItems[0], index: number) => (
        <Card key={index} padding={isLandscape ? 'small' : 'medium'} shadow="large" fullWidth={true}>
            <TouchableOpacity
                style={styles.cardContent}
                onPress={item.onPress}
                activeOpacity={0.8}
            >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                    <Icon
                        name={item.icon}
                        size={isLandscape ? ComponentSizes.icon.medium : (isSmallDevice ? ComponentSizes.icon.large : ComponentSizes.icon.xlarge)}
                        color={item.color}
                    />
                </View>
                <ResponsiveText
                    variant={isLandscape ? 'bodySmall' : (isSmallDevice ? 'bodySmall' : 'body')}
                    style={styles.cardTitle}
                    align="center"
                >
                    {item.title}
                </ResponsiveText>
            </TouchableOpacity>
        </Card>
    );

    const renderQuickAction = (item: typeof quickActions[0], index: number) => (
        <TouchableOpacity
            key={index}
            style={[styles.quickActionCard, { backgroundColor: item.color }]}
            onPress={item.onPress}
            activeOpacity={0.8}
        >
            <Icon
                name={item.icon}
                size={ComponentSizes.icon.medium}
                color="white"
            />
            <ResponsiveText
                variant="bodySmall"
                style={styles.quickActionText}
                color="white"
            >
                {item.title}
            </ResponsiveText>
        </TouchableOpacity>
    );

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    const getUserDisplayName = () => {
        return user?.displayName || user?.email?.split('@')[0] || 'User';
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            {/* Header */}
            <CommonHeader
                title={getUserDisplayName()}
                subtitle={`${getGreeting()},`}
                leftElement="menu"
                rightElement="notification"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Quick Actions */}
                <View style={styles.quickActionsContainer}>
                    <ResponsiveText
                        variant="h4"
                        style={styles.sectionTitle}
                        color={colors.text}
                    >
                        Quick Actions
                    </ResponsiveText>
                    <View style={styles.quickActionsRow}>
                        {quickActions.map(renderQuickAction)}
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={styles.statsContainer}>
                    <Card padding="medium" shadow="large" style={styles.statsCard}>
                        <View style={styles.statsContent}>
                            <View style={styles.statItem}>
                                <ResponsiveText variant="h3" color={colors.primary}>
                                    {dashboardStats.totalBookings}
                                </ResponsiveText>
                                <ResponsiveText variant="bodySmall" color={colors.textSecondary}>
                                    Services Booked
                                </ResponsiveText>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <ResponsiveText variant="h3" color={colors.primary}>
                                    {dashboardStats.revenue}
                                </ResponsiveText>
                                <ResponsiveText variant="bodySmall" color={colors.textSecondary}>
                                    Average Rating
                                </ResponsiveText>
                            </View>
                        </View>
                    </Card>
                </View>

                {/* Main Menu */}
                <View style={styles.menuSection}>
                    <ResponsiveText
                        variant="h4"
                        style={styles.sectionTitle}
                        color={colors.text}
                    >
                        Explore Services
                    </ResponsiveText>

                    <Grid spacing={Spacing.m} numColumns={numColumns}>
                        {menuItems.map(renderMenuItem)}
                    </Grid>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;