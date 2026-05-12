import React, { useMemo, useState } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    Switch,
    Image,
    ActivityIndicator,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import messaging from '@react-native-firebase/messaging';

import { Spacing } from '../../../../../shared/theme/theme';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { logout as logoutAction } from '../../../../auth/store/authSlice';
import { settingsRepository } from '../../../data/SettingsRepository';
import { setLoading, setError, setTheme, setPushNotificationsEnabled } from '../../../store/settingsSlice';
import { getStyles } from './style';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { DrawerParamList } from '../../../../../navigation/navigationTypes';
import { crashlyticsRepository } from '../../../../../core/crashlyticsRepository';

const SettingScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const { colors, theme, isDark } = useTheme();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
    const { isSmallDevice } = useResponsive();

    const { isLoading } = useAppSelector((state) => state.settings);
    const { user } = useAppSelector((state) => state.auth);
    const pushNotificationsEnabled = useAppSelector((state) => state.settings.pushNotificationsEnabled);

    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [photoUploading, setPhotoUploading] = useState(false);

    const handleTogglePushNotifications = async (value: boolean) => {
        if (value) {
            try {
                const authStatus = await messaging().requestPermission();
                const enabled =
                    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
                    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

                if (enabled) {
                    dispatch(setPushNotificationsEnabled(true));
                } else {
                    Alert.alert(
                        'Permission Denied',
                        'Please enable notifications from your device settings to receive push notifications.',
                        [{ text: 'OK' }]
                    );
                }
            } catch (error) {
                console.error('Error requesting notification permission:', error);
            }
        } else {
            dispatch(setPushNotificationsEnabled(false));
        }
    };

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout your session?',
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

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword' as never);
    };

    const handlePickPhoto = () => {
        Alert.alert(
            'Update Profile Photo',
            'Choose how you want to upload your photo',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: '📷  Camera', onPress: () => openCamera() },
                { text: '🖼️  Photo Library', onPress: () => openGallery() },
            ]
        );
    };

    const handleCrashlyticsTest = () => {
        Alert.alert(
            'Crashlytics Test',
            'App crash hoga aur data Firebase console me dikhega. Continue?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Test Crash',
                    style: 'destructive',
                    onPress: async () => {
                        // Log breadcrumb before crash so it shows in console
                        crashlyticsRepository.log('Manual test crash triggered from Settings');
                        await crashlyticsRepository.setUserId('test-user-crash');
                        // Native crash — this is what Crashlytics actually captures
                        crashlyticsRepository.testNativeCrash();
                    },
                },
            ]
        );
    };

    const openCamera = () => {
        launchCamera(
            { mediaType: 'photo' as MediaType, quality: 0.8, saveToPhotos: false },
            handleImageResponse
        );
    };

    const openGallery = () => {
        launchImageLibrary(
            { mediaType: 'photo' as MediaType, quality: 0.8, selectionLimit: 1 },
            handleImageResponse
        );
    };

    const handleImageResponse = (response: ImagePickerResponse) => {
        if (response.didCancel) return;
        if (response.errorCode) {
            Alert.alert('Error', response.errorMessage || 'Could not pick image');
            return;
        }
        const uri = response.assets?.[0]?.uri;
        if (uri) {
            setPhotoUploading(true);
            setTimeout(() => {
                setProfilePhoto(uri);
                setPhotoUploading(false);
            }, 1200);
        }
    };

    const preferenceItems = [
        {
            title: 'Dark Mode',
            subtitle: isDark ? 'Dark theme enabled' : 'Light theme enabled',
            icon: isDark ? 'weather-night' : 'white-balance-sunny',
            color: '#F59E0B',
            rightElement: (
                <Switch
                    value={isDark}
                    onValueChange={toggleTheme}
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={isDark ? colors.white : '#f4f3f4'}
                />
            ),
        },
        {
            title: 'Language',
            subtitle: 'English (United States)',
            icon: 'translate',
            color: '#06B6D4',
            onPress: () => { },
        },
    ];

    const accountItems = [
        {
            title: 'Change Password',
            subtitle: 'Keep your account secure',
            icon: 'lock-outline',
            color: '#3B82F6',
            onPress: handleChangePassword,
        },
        {
            title: 'Push Notifications',
            subtitle: pushNotificationsEnabled ? 'Notifications are enabled' : 'Notifications are disabled',
            icon: pushNotificationsEnabled ? 'bell-ring-outline' : 'bell-off-outline',
            color: '#F59E0B',
            rightElement: (
                <Switch
                    value={pushNotificationsEnabled}
                    onValueChange={handleTogglePushNotifications}
                    trackColor={{ false: '#767577', true: colors.primary }}
                    thumbColor={pushNotificationsEnabled ? colors.white : '#f4f3f4'}
                />
            ),
        },
        {
            title: 'Sign Out',
            subtitle: 'Logout from your account',
            icon: 'logout',
            color: '#EF4444',
            onPress: handleLogout,
        },
    ];

    const privacyItems = [
        {
            title: 'Privacy Policy',
            subtitle: 'Read our privacy policy',
            icon: 'shield-outline',
            color: '#8B5CF6',
            onPress: () => { },
        },
        {
            title: 'Terms of Service',
            subtitle: 'Read our terms of service',
            icon: 'file-document-outline',
            color: '#06B6D4',
            onPress: () => { },
        },
        {
            title: 'Help & Support',
            subtitle: 'Get help and contact support',
            icon: 'help-circle-outline',
            color: '#10B981',
            onPress: () => navigation.navigate('Support' as never),
        },
    ];

    const renderMenuItem = (
        item: { title: string; subtitle: string; icon: string; color: string; onPress?: () => void; rightElement?: React.ReactNode },
        index: number
    ) => (
        <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={item.onPress ? 0.7 : 1}
            disabled={!item.onPress && !item.rightElement}
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
                    variant={isSmallDevice ? 'body' : 'h4'}
                    style={styles.menuText}
                >
                    {item.title}
                </ResponsiveText>
                <ResponsiveText variant="bodySmall" style={styles.menuSubtext}>
                    {item.subtitle}
                </ResponsiveText>
            </View>
            {item.rightElement ? (
                item.rightElement
            ) : (
                <Icon name="chevron-right" size={20} color={colors.textSecondary} style={styles.chevron} />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            <CommonHeader
                title="Settings"
                leftElement="menu"
                rightElement="notification"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Spacing.m }}
            >
                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <TouchableOpacity
                        style={styles.avatarWrapper}
                        onPress={handlePickPhoto}
                        activeOpacity={0.85}
                    >
                        <View style={styles.avatar}>
                            {photoUploading ? (
                                <ActivityIndicator size="large" color={colors.primary} />
                            ) : profilePhoto ? (
                                <Image source={{ uri: profilePhoto }} style={styles.avatarImage} />
                            ) : (
                                <Icon
                                    name="account"
                                    size={isSmallDevice ? 40 : 50}
                                    color={colors.primary}
                                />
                            )}
                        </View>
                        <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
                            <Icon name="camera" size={13} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <ResponsiveText
                        variant={isSmallDevice ? 'h3' : 'h2'}
                        style={styles.userName}
                    >
                        {user?.displayName || user?.email?.split('@')[0] || 'User'}
                    </ResponsiveText>
                    <ResponsiveText variant="body" style={styles.userEmail}>
                        {user?.email || 'No email provided'}
                    </ResponsiveText>
                </View>

                {/* App Preferences */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        App Preferences
                    </ResponsiveText>
                    {preferenceItems.map(renderMenuItem)}
                </View>

                {/* Account Settings */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Account Settings
                    </ResponsiveText>
                    {accountItems.map(renderMenuItem)}
                </View>

                {/* Privacy & Support */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Privacy & Support
                    </ResponsiveText>
                    {privacyItems.map(renderMenuItem)}
                </View>

                {/* Developer Tools */}
                {__DEV__ && (
                    <View style={styles.menuSection}>
                        <ResponsiveText variant="h4" style={styles.sectionTitle}>
                            Developer Tools
                        </ResponsiveText>
                        {[{
                            title: 'Test Crashlytics',
                            subtitle: 'Force crash to test Crashlytics reporting',
                            icon: 'alert-circle-outline',
                            color: '#EF4444',
                            onPress: handleCrashlyticsTest,
                        }].map(renderMenuItem)}
                    </View>
                )}


            </ScrollView>
        </View>
    );
};

export default SettingScreen;
