import React, { useMemo } from 'react';
import { View, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { DrawerParamList, RootStackParamList } from '../../../../../navigation/navigationTypes';
import { getStyles } from './style';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { Spacing } from '../../../../../shared/theme/theme';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

const ProfileScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { colors } = useTheme();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
    const { user } = useAppSelector((state) => state.auth);
    const { isSmallDevice } = useResponsive();

    const menuItems = [
        {
            title: 'Edit Profile',
            subtitle: 'Update your personal information',
            icon: 'account-edit',
            onPress: () => navigation.navigate('EditProfile'),
            color: colors.primary,
        },
        {
            title: 'Account Settings',
            subtitle: 'Privacy, security, and preferences',
            icon: 'cog',
            onPress: () => navigation.navigate('MainDrawer', { screen: 'Settings' } as any),
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
            onPress: () => navigation.navigate('Support'),
            color: '#8B5CF6',
        },
        {
            title: 'About',
            subtitle: 'App version and information',
            icon: 'information',
            onPress: () => navigation.navigate('About'),
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
                    size={isSmallDevice ? 20 : 24}
                    color={item.color}
                />
            </View>
            <View style={styles.menuContent}>
                <ResponsiveText
                    variant={isSmallDevice ? "body" : "h4"}
                    style={styles.menuText}
                >
                    {item.title}
                </ResponsiveText>
                <ResponsiveText
                    variant="bodySmall"
                    style={styles.menuSubtext}
                >
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
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            {/* Header */}
            <CommonHeader
                title="Profile"
                leftElement="menu"
                rightElement="more"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Spacing.m }}
            >
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Icon
                            name="account"
                            size={isSmallDevice ? 40 : 50}
                            color={colors.primary}
                        />
                    </View>
                    <ResponsiveText
                        variant={isSmallDevice ? "h3" : "h2"}
                        style={styles.userName}
                    >
                        {getUserDisplayName()}
                    </ResponsiveText>
                    <ResponsiveText
                        variant="body"
                        style={styles.userEmail}
                    >
                        {getUserEmail()}
                    </ResponsiveText>
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

                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    <ResponsiveText
                        variant="h4"
                        style={styles.sectionTitle}
                    >
                        Account
                    </ResponsiveText>
                    {menuItems.map(renderMenuItem)}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;