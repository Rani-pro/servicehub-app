import React, { useMemo, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Alert,
    Switch,
    Image,
    ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { launchImageLibrary, launchCamera, ImagePickerResponse, MediaType } from 'react-native-image-picker';
const Icon = FeatherIcon as any;

import { Spacing } from '../../../../../shared/theme/theme';
import Button from '../../../../../shared/components/Button';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { logout as logoutAction } from '../../../../auth/store/authSlice';
import { settingsRepository } from '../../../data/SettingsRepository';
import { setLoading, setError, setTheme } from '../../../store/settingsSlice';
import { getStyles } from './style';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { DrawerParamList } from '../../../../../navigation/navigationTypes';
import { crashlyticsRepository } from '../../../../../core/crashlyticsRepository';

const SettingScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();
    const { colors, theme, isDark } = useTheme();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);

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
                {
                    text: '📷  Camera',
                    onPress: () => openCamera(),
                },
                {
                    text: '🖼️  Photo Library',
                    onPress: () => openGallery(),
                },
            ]
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
                    onPress: () => {
                        crashlyticsRepository.crash();
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
            // Simulate upload delay (replace with real upload logic)
            setTimeout(() => {
                setProfilePhoto(uri);
                setPhotoUploading(false);
            }, 1200);
        }
    };

    const SettingItem = ({
        icon,
        label,
        description,
        onPress,
        isLast = false,
        rightElement
    }: {
        icon: string,
        label: string,
        description?: string,
        onPress?: () => void,
        isLast?: boolean,
        rightElement?: React.ReactNode
    }) => (
        <TouchableOpacity
            style={[styles.settingItem, isLast && styles.settingItemLast]}
            onPress={onPress}
            activeOpacity={onPress ? 0.7 : 1}
            disabled={!onPress}
        >
            <View style={styles.settingIconContainer}>
                <Icon name={icon} size={20} color={colors.primary} />
            </View>
            <View style={styles.settingTextContainer}>
                <Text style={styles.settingLabel}>{label}</Text>
                {description && <Text style={styles.settingDescription}>{description}</Text>}
            </View>
            {rightElement ? rightElement : (
                <Icon name="chevron-right" size={20} color={colors.textSecondary} />
            )}
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title="Settings"
                leftElement="menu"
                rightElement="notification"
            />

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.profileCard}>
                    {/* Avatar with camera upload badge */}
                    <TouchableOpacity
                        style={styles.avatarWrapper}
                        onPress={handlePickPhoto}
                        activeOpacity={0.85}
                    >
                        <View style={styles.avatarContainer}>
                            {photoUploading ? (
                                <ActivityIndicator size="large" color={colors.primary} />
                            ) : profilePhoto ? (
                                <Image
                                    source={{ uri: profilePhoto }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <Icon name="user" size={45} color={colors.primary} />
                            )}
                        </View>
                        {/* Camera badge */}
                        <View style={[styles.cameraBadge, { backgroundColor: colors.primary }]}>
                            <Icon name="camera" size={13} color="#fff" />
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.userName}>{user?.displayName || user?.email?.split('@')[0] || 'User'}</Text>
                    <Text style={styles.userEmail}>{user?.email || 'No email provided'}</Text>


                </View>

                <Text style={styles.sectionTitle}>App Preferences</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon={isDark ? "moon" : "sun"}
                        label="Dark Mode"
                        description={isDark ? "Dark theme enabled" : "Light theme enabled"}
                        rightElement={
                            <Switch
                                value={isDark}
                                onValueChange={toggleTheme}
                                trackColor={{ false: '#767577', true: colors.primary }}
                                thumbColor={isDark ? colors.white : '#f4f3f4'}
                            />
                        }
                    />
                    <SettingItem
                        icon="globe"
                        label="Language"
                        description="English (United States)"
                        onPress={() => { }}
                        isLast={true}
                    />
                </View>

                <Text style={styles.sectionTitle}>Account Settings</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="lock"
                        label="Change Password"
                        description="Keep your account secure"
                        onPress={handleChangePassword}
                    />
                    <SettingItem
                        icon="bell"
                        label="Notifications"
                        description="Manage your alerts"
                        onPress={() => { }}
                        isLast={true}
                    />
                </View>

                <Text style={styles.sectionTitle}>Privacy &amp; Support</Text>
                <View style={styles.section}>
                    <SettingItem
                        icon="shield"
                        label="Privacy Policy"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon="file-text"
                        label="Terms of Service"
                        onPress={() => { }}
                    />
                    <SettingItem
                        icon="help-circle"
                        label="Help &amp; Support"
                        onPress={() => { }}
                        isLast={true}
                    />
                </View>

                {/* Developer Tools section - Only show in development */}
                {__DEV__ && (
                    <>
                        <Text style={styles.sectionTitle}>Developer Tools</Text>
                        <View style={styles.section}>
                            <SettingItem
                                icon="alert-triangle"
                                label="Test Crashlytics"
                                description="Force crash to test Crashlytics reporting"
                                onPress={handleCrashlyticsTest}
                                isLast={true}
                            />
                        </View>
                    </>
                )}

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
        </SafeAreaView>
    );
};

export default SettingScreen;
