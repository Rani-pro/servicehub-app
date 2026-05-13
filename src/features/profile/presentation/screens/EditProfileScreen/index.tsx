import React, { useMemo, useState } from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    Modal,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary, launchCamera, MediaType } from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useAppSelector } from '../../../../../shared/hooks/reduxHooks';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import Input from '../../../../../shared/components/Input';

import { PhoneNumberInput, Country } from '../../../../../shared/components';
import { Spacing } from '../../../../../shared/theme/theme';
import { getStyles } from './style';

const EditProfileScreen = () => {

    const navigation = useNavigation();
    const { colors } = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const { isSmallDevice } = useResponsive();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);

    const getUserDisplayName = () => {
        if (user?.displayName) return user.displayName;
        if (typeof user?.email === 'string' && typeof user.email.split === 'function') {
            return user.email.split('@')[0];
        }
        return '';
    };

    const [displayName, setDisplayName] = useState(getUserDisplayName());
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [photoModalVisible, setPhotoModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countryDialCode, setCountryDialCode] = useState('+91');

    const handlePickFromGallery = () => {
        setPhotoModalVisible(false);
        launchImageLibrary({ mediaType: 'photo' as MediaType, quality: 0.8 }, (response) => {
            if (response.didCancel || response.errorCode) return;
            const uri = response.assets?.[0]?.uri;
            if (uri) setProfilePhoto(uri);
        });
    };

    const handleTakePhoto = () => {
        setPhotoModalVisible(false);
        launchCamera({ mediaType: 'photo' as MediaType, quality: 0.8 }, (response) => {
            if (response.didCancel || response.errorCode) return;
            const uri = response.assets?.[0]?.uri;
            if (uri) setProfilePhoto(uri);
        });
    };

    const handleSave = async () => {
        if (!displayName.trim()) {
            Alert.alert('Validation', 'Name cannot be empty.');
            return;
        }
        setLoading(true);
        // TODO: wire up to your update-profile use case / repository
        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Profile updated successfully!', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        }, 800);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            <CommonHeader
                title="Edit Profile"
                leftElement="back"
                rightElement="none"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
            >
                {/* Avatar */}
                <View style={styles.avatarSection}>
                    <View style={styles.avatarWrapper}>
                        <View style={styles.avatar}>
                            {profilePhoto ? (
                                <Image
                                    source={{ uri: profilePhoto }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <Icon
                                    name="account"
                                    size={isSmallDevice ? 44 : 54}
                                    color={colors.primary}
                                />
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.editAvatarBtn}
                            activeOpacity={0.8}
                            onPress={() => setPhotoModalVisible(true)}
                        >
                            <Icon name="camera" size={14} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                    <ResponsiveText variant="bodySmall" style={styles.avatarHint}>
                        Tap camera to change photo
                    </ResponsiveText>
                </View>

                {/* Personal Info */}
                <View style={styles.formCard}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Personal Information
                    </ResponsiveText>

                    <Input
                        label="Full Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        placeholder="Enter your full name"
                        autoCapitalize="words"
                    />

                    <Input
                        label="Email"
                        value={user?.email || ''}
                        onChangeText={() => { }}
                        placeholder="Email address"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={{ marginTop: Spacing.s }}
                    />

                    {/* Phone with Country Code */}
                    <View style={{ marginTop: Spacing.s }}>
                        <ResponsiveText variant="bodySmall" style={styles.phoneLabel}>
                            Phone Number
                        </ResponsiveText>
                        <PhoneNumberInput
                            value={phone}
                            onChangeText={setPhone}
                            onCountryChange={(country: Country) => setCountryDialCode(country.dialCode)}
                            defaultCountryCode="IN"
                            containerStyle={{ marginTop: Spacing.xs }}
                        />
                    </View>
                </View>

                {/* Additional Info */}
                <View style={styles.formCard}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Additional Information
                    </ResponsiveText>

                    <Input
                        label="Address"
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter your address"
                        autoCapitalize="sentences"
                    />

                    <Input
                        label="Bio"
                        value={bio}
                        onChangeText={setBio}
                        placeholder="Tell us a little about yourself"
                        multiline
                        numberOfLines={3}
                        style={{ marginTop: Spacing.s }}
                    />
                </View>

                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    disabled={loading}
                    activeOpacity={0.7}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <>
                            <Icon name="content-save-outline" size={20} color="#FFFFFF" />
                            <ResponsiveText variant="body" style={styles.saveBtnText}>
                                Save Changes
                            </ResponsiveText>

                        </>
                    )}
                </TouchableOpacity>
            </ScrollView>

            {/* Photo Picker Modal */}
            <Modal
                visible={photoModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setPhotoModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.photoPickerSheet}>
                        <ResponsiveText variant="h4" style={styles.modalTitle}>
                            Change Profile Photo
                        </ResponsiveText>
                        <TouchableOpacity style={styles.photoOption} onPress={handleTakePhoto} activeOpacity={0.7}>
                            <Icon name="camera-outline" size={22} color={colors.primary} />
                            <ResponsiveText variant="body" style={styles.photoOptionText}>Take Photo</ResponsiveText>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.photoOption} onPress={handlePickFromGallery} activeOpacity={0.7}>
                            <Icon name="image-outline" size={22} color={colors.primary} />
                            <ResponsiveText variant="body" style={styles.photoOptionText}>Choose from Gallery</ResponsiveText>
                        </TouchableOpacity>
                        {profilePhoto && (
                            <TouchableOpacity
                                style={styles.photoOption}
                                onPress={() => { setProfilePhoto(null); setPhotoModalVisible(false); }}
                                activeOpacity={0.7}
                            >
                                <Icon name="delete-outline" size={22} color={colors.error || 'red'} />
                                <ResponsiveText variant="body" style={{ ...styles.photoOptionText, color: colors.error || 'red' }}>Remove Photo</ResponsiveText>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity style={styles.photoCancelBtn} onPress={() => setPhotoModalVisible(false)} activeOpacity={0.7}>
                            <ResponsiveText variant="body" style={styles.photoCancelText}>Cancel</ResponsiveText>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default EditProfileScreen;
