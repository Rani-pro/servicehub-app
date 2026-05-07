import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    StatusBar,
    Switch,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';

import { crashlyticsRepository } from '../../../../../core/crashlyticsRepository';
import Button from '../../../../../shared/components/Button';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { Spacing } from '../../../../../shared/theme/theme';
import { logout as logoutAction } from '../../../../auth/store/authSlice';
import { settingsRepository } from '../../../data/SettingsRepository';
import { setError, setLoading, setTheme } from '../../../store/settingsSlice';
import { getStyles } from './style';

const SettingScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const { colors, theme, isDark } = useTheme();
    const { isSmallDevice, isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();

    const styles = useMemo(
        () => getStyles(colors, Spacing, isLandscape),
        [colors, isLandscape, screenWidth],
    );

    const { isLoading } = useAppSelector((state) => state.settings);
    const { user } = useAppSelector((state) => state.auth);

    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [photoUploading, setPhotoUploading] = useState(false);

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
            ],
        );
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        dispatch(setTheme(newTheme));
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword');
    };

    const handlePickPhoto = () => {
        Alert.alert(
            'Update Profile Photo',
            'Choose how you want to upload your photo',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: '📷  Camera', onPress: () => openCamera() },
                { text: '🖼️  Photo Library', onPress: () => openGallery() },
            ],
        );
    };

    const handleCrashlyticsTest = () => {
        Alert.alert(
            'Crashlytics Test',
            'This will crash the app to test Crashlytics reporting. Are you sure?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Test Crash',
                    style: 'destructive',
                    onPress: () => crashlyticsRepository.crash(),
                },
            ],
        );
    };

    const openCamera = async () => {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Required', 'Camera access is needed to take a photo.');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsEditing: false,
        });
        handleImageResult(result);
    };

    const openGallery = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission Required', 'Photo library access is needed to select a photo.');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
            allowsMultipleSelection: false,
        });
        handleImageResult(result);
    };

    const handleImageResult = (result: ImagePicker.ImagePickerResult) => {
        if (result.canceled) return;
        const uri = result.assets?.[0]?.uri;
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
            title: 'Notifications',
            subtitle: 'Manage your alerts',
            icon: 'bell-outline',
            color: '#F59E0B',
            onPress: () => navigation.navigate('Notifications'),
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
            onPress: () => { },
        },
    ];

    const renderMenuItem = (
        item: { title: string; subtitle: string; icon: string; color: string; onPress?: () => void; rightElement?: React.ReactNode },
        index: number,
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
            {item.rightElement ? (
                item.rightElement
            ) : (
                <Icon name="chevron-right" size={20} color={colors.textSecondary} style={styles.chevron} />
            )}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

            <CommonHeader
                title="Settings"
                leftElement="menu"
                rightElement="notification"
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
                                    size={isLandscape ? 30 : (isSmallDevice ? 40 : 50)}
                                    color={colors.primary}
                                />
                            )}
                        </View>
                        <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
                            <Icon name="camera" size={13} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.profileInfo}>
                        <ResponsiveText
                            variant={isLandscape ? 'h4' : (isSmallDevice ? 'h3' : 'h2')}
                            style={styles.userName}
                        >
                            {user?.displayName || user?.email?.split('@')[0] || 'User'}
                        </ResponsiveText>
                        <ResponsiveText variant="body" style={styles.userEmail}>
                            {user?.email || 'No email provided'}
                        </ResponsiveText>
                    </View>
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

                {/* Logout */}
                <View style={styles.logoutButton}>
                    <Button
                        title="Sign Out"
                        onPress={handleLogout}
                        variant="danger"
                        loading={isLoading}
                        size="small"
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default SettingScreen;
