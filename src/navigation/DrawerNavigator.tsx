import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { DrawerParamList } from './navigationTypes';
import { useTheme } from '../shared/hooks/useTheme';
import { useAppSelector } from '../shared/hooks/reduxHooks';
import { useResponsive } from '../shared/hooks/useResponsive';
import { logout as logoutAction } from '../features/auth/store/authSlice';
import { settingsRepository } from '../features/settings/data/SettingsRepository';
import { setLoading, setError } from '../features/settings/store/settingsSlice';
import { Spacing, ComponentSizes, Typography, Shadows } from '../shared/theme/theme';
import ResponsiveText from '../shared/components/ResponsiveText';

// Navigators and Screens
import BottomTabNavigator from './BottomTabNavigator';
import SettingScreen from '../features/settings/presentation/screens/SettingScreen';
import ProfileScreen from '../features/profile/presentation/screens/ProfileScreen';
import NotesScreen from '../features/notes/presentation/screens/NotesScreen';
import ServicesListScreen from '../features/services/presentation/screens/ServicesListScreen';
import SupportScreen from '../features/support/presentation/screens/SupportScreen';
import AboutScreen from '../features/about/presentation/screens/AboutScreen';
import FeedbackScreen from '../features/support/presentation/screens/FeedbackScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { colors } = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const { isLoading } = useAppSelector((state) => state.settings);
    const { isTablet, isSmallDevice } = useResponsive();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        dispatch(setLoading(true));
                        try {
                            await settingsRepository.logout();
                            dispatch(logoutAction());
                        } catch (error: any) {
                            dispatch(setError(error.message));
                            Alert.alert('Error', error.message);
                        } finally {
                            dispatch(setLoading(false));
                        }
                    },
                },
            ]
        );
    };

    const styles = {
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        header: {
            backgroundColor: colors.primary,
            padding: Spacing.l,
            paddingTop: Spacing.xl,
        },
        avatar: {
            width: isSmallDevice ? 50 : 60,
            height: isSmallDevice ? 50 : 60,
            borderRadius: isSmallDevice ? 25 : 30,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            marginBottom: Spacing.m,
        },
        drawerContent: {
            flex: 1,
            paddingTop: Spacing.m,
        },
        footer: {
            borderTopWidth: 1,
            borderTopColor: colors.border,
            padding: Spacing.m,
        },
        logoutButton: {
            flexDirection: 'row' as const,
            alignItems: 'center' as const,
            padding: Spacing.s,
            borderRadius: ComponentSizes.button.borderRadius,
            backgroundColor: colors.secondaryBackground,
            ...Shadows.small,
        },
        logoutText: {
            marginLeft: Spacing.s,
            color: colors.danger,
            fontWeight: '500' as const,
        },
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Icon 
                        name="account" 
                        size={isSmallDevice ? ComponentSizes.icon.medium : ComponentSizes.icon.large} 
                        color="#fff" 
                    />
                </View>
                <ResponsiveText 
                    variant={isSmallDevice ? "h4" : "h3"} 
                    color="#fff"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {user?.displayName || user?.email?.split('@')[0] || 'User'}
                </ResponsiveText>
                <ResponsiveText 
                    variant="bodySmall" 
                    color="rgba(255, 255, 255, 0.8)"
                    numberOfLines={1}
                    ellipsizeMode="middle"
                >
                    {user?.email || 'No email provided'}
                </ResponsiveText>
            </View>

            <DrawerContentScrollView {...props} style={styles.drawerContent}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                    disabled={isLoading}
                    activeOpacity={0.7}
                >
                    <Icon name="logout" size={ComponentSizes.icon.small * 0.8} color={colors.danger} />
                    <ResponsiveText variant="body" style={styles.logoutText}>
                        {isLoading ? 'Logging out...' : 'Logout'}
                    </ResponsiveText>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const DrawerNavigator = () => {
    const { colors } = useTheme();
    const { isTablet } = useResponsive();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colors.background,
                    width: isTablet ? 320 : 280,
                },
                drawerActiveTintColor: colors.primary,
                drawerInactiveTintColor: colors.textSecondary,
                drawerLabelStyle: {
                    fontSize: Typography.body.fontSize,
                    fontWeight: Typography.body.fontWeight,
                    marginLeft: -10,
                },
                drawerItemStyle: {
                    marginVertical: 2,
                    borderRadius: ComponentSizes.button.borderRadius,
                    paddingHorizontal: 10,
                },
                drawerActiveBackgroundColor: colors.primary + '15',
            }}
        >
            <Drawer.Screen
                name="MainTabs"
                component={BottomTabNavigator}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
                listeners={({ navigation }) => ({
                    drawerItemPress: (e) => {
                        // Navigate to MainTabs and reset to Home tab
                        navigation.navigate('MainTabs', { screen: 'Home' });
                    },
                })}
            />
            <Drawer.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerLabel: 'Profile',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="account" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Settings"
                component={SettingScreen}
                options={{
                    drawerLabel: 'Settings',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="cog" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Notes"
                component={NotesScreen}
                options={{
                    drawerLabel: 'My Notes',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="note-text" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Services"
                component={ServicesListScreen}
                options={{
                    drawerLabel: 'Services',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="tools" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Support"
                component={SupportScreen}
                options={{
                    drawerLabel: 'Support',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="help-circle" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="About"
                component={AboutScreen}
                options={{
                    drawerLabel: 'About Us',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="information" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="Feedback"
                component={FeedbackScreen}
                options={{
                    drawerLabel: 'Feedback',
                    drawerIcon: ({ color, size }) => (
                        <Icon name="message-text" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;