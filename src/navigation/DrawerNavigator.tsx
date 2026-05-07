import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Alert, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from '../features/auth/store/authSlice';
import { settingsRepository } from '../features/settings/data/SettingsRepository';
import { setError, setLoading } from '../features/settings/store/settingsSlice';
import ResponsiveText from '../shared/components/ResponsiveText';
import { useAppSelector } from '../shared/hooks/reduxHooks';
import { useResponsive } from '../shared/hooks/useResponsive';
import { useTheme } from '../shared/hooks/useTheme';
import { ComponentSizes, Shadows, Spacing, Typography } from '../shared/theme/theme';
import { DrawerParamList } from './navigationTypes';

// Navigators and Screens
import ProfileScreen from '../features/profile/presentation/screens/ProfileScreen';
import SettingScreen from '../features/settings/presentation/screens/SettingScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const { colors } = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const { isLoading } = useAppSelector((state) => state.settings);
    const { isTablet, isSmallDevice, isLandscape } = useResponsive();
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
            padding: isLandscape ? Spacing.m : Spacing.l,
            paddingTop: isLandscape ? Spacing.m : Spacing.xl,
        },
        avatar: {
            width: isLandscape ? 40 : (isSmallDevice ? 50 : 60),
            height: isLandscape ? 40 : (isSmallDevice ? 50 : 60),
            borderRadius: isLandscape ? 20 : (isSmallDevice ? 25 : 30),
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            alignItems: 'center' as const,
            justifyContent: 'center' as const,
            marginBottom: isLandscape ? Spacing.s : Spacing.m,
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
    const { isTablet, isLandscape } = useResponsive();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    backgroundColor: colors.background,
                    // Landscape phones: narrower drawer so content still visible
                    width: isTablet ? 320 : (isLandscape ? 240 : 280),
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
        </Drawer.Navigator>
    );
};

export default DrawerNavigator;