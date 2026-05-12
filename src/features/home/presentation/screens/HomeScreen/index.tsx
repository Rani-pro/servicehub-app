import React, { useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerParamList, BottomTabParamList, RootStackParamList } from '../../../../../navigation/navigationTypes';
import { getStyles } from './style';
import Card from '../../../../../shared/components/Card';
import Grid from '../../../../../shared/components/Grid';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { Spacing, ComponentSizes } from '../../../../../shared/theme/theme';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList>,
    CompositeNavigationProp<
        DrawerNavigationProp<DrawerParamList>,
        NativeStackNavigationProp<RootStackParamList>
    >
>;

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { colors, isDark } = useTheme();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
    const { user } = useAppSelector((state) => state.auth);
    const { isTablet, isSmallDevice, isLandscape } = useResponsive();
    const insets = useSafeAreaInsets();

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
            onPress: () => navigation.navigate('Support'),
            color: '#F59E0B',
            gradient: ['#F59E0B', '#D97706'],
        },
        {
            title: 'About',
            icon: 'information',
            onPress: () => navigation.navigate('About'),
            color: '#EF4444',
            gradient: ['#EF4444', '#DC2626'],
        },
        {
            title: 'Feedback',
            icon: 'message-text',
            onPress: () => navigation.navigate('Feedback'),
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
        <Card key={index} padding="medium" shadow="large" fullWidth={false}>
            <TouchableOpacity
                style={styles.cardContent}
                onPress={item.onPress}
                activeOpacity={0.8}
            >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                    <Icon
                        name={item.icon}
                        size={isSmallDevice ? ComponentSizes.icon.large : ComponentSizes.icon.xlarge}
                        color={item.color}
                    />
                </View>
                <ResponsiveText
                    variant={isSmallDevice ? "bodySmall" : "body"}
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
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header */}
            <CommonHeader
                title={getUserDisplayName()}
                subtitle={`${getGreeting()},`}
                leftElement="menu"
                rightElement="notification"
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingHorizontal: Math.max(Spacing.m, insets.left + Spacing.m),
                        paddingBottom: Math.max(Spacing.s, insets.bottom + Spacing.s),
                    },
                ]}
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
                                    12
                                </ResponsiveText>
                                <ResponsiveText variant="bodySmall" color={colors.textSecondary}>
                                    Services Booked
                                </ResponsiveText>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <ResponsiveText variant="h3" color={colors.primary}>
                                    4.8
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

                    <Grid spacing={Spacing.s} numColumns={isTablet ? 3 : 2} containerPadding={Spacing.m}>
                        {menuItems.map(renderMenuItem)}
                    </Grid>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;