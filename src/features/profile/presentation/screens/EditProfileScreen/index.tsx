import React, { useMemo, useState } from 'react';
import {
    View,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert,
    Modal,
    FlatList,
    TextInput,
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
import Button from '../../../../../shared/components/Button';
import { Spacing } from '../../../../../shared/theme/theme';
import { getStyles } from './style';

const COUNTRY_CODES = [
    { code: 'IN', name: 'India', dial: '+91', flag: '🇮🇳' },
    { code: 'US', name: 'United States', dial: '+1', flag: '🇺🇸' },
    { code: 'GB', name: 'United Kingdom', dial: '+44', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', dial: '+61', flag: '🇦🇺' },
    { code: 'CA', name: 'Canada', dial: '+1', flag: '🇨🇦' },
    { code: 'AE', name: 'UAE', dial: '+971', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', dial: '+966', flag: '🇸🇦' },
    { code: 'PK', name: 'Pakistan', dial: '+92', flag: '🇵🇰' },
    { code: 'BD', name: 'Bangladesh', dial: '+880', flag: '🇧🇩' },
    { code: 'DE', name: 'Germany', dial: '+49', flag: '🇩🇪' },
    { code: 'FR', name: 'France', dial: '+33', flag: '🇫🇷' },
    { code: 'SG', name: 'Singapore', dial: '+65', flag: '🇸🇬' },
    { code: 'NZ', name: 'New Zealand', dial: '+64', flag: '🇳🇿' },
    { code: 'ZA', name: 'South Africa', dial: '+27', flag: '🇿🇦' },
    { code: 'NG', name: 'Nigeria', dial: '+234', flag: '🇳🇬' },
    { code: 'JP', name: 'Japan', dial: '+81', flag: '🇯🇵' },
    { code: 'CN', name: 'China', dial: '+86', flag: '🇨🇳' },
    { code: 'BR', name: 'Brazil', dial: '+55', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', dial: '+52', flag: '🇲🇽' },
    { code: 'IT', name: 'Italy', dial: '+39', flag: '🇮🇹' },
];

const EditProfileScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const { user } = useAppSelector((state) => state.auth);
    const { isSmallDevice } = useResponsive();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);

    const [displayName, setDisplayName] = useState(
        user?.displayName || user?.email?.split('@')[0] || ''
    );
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [photoModalVisible, setPhotoModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
    const [countryModalVisible, setCountryModalVisible] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');

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
                        <View style={styles.phoneRow}>
                            <TouchableOpacity
                                style={styles.countryCodeBtn}
                                onPress={() => {
                                    setCountrySearch('');
                                    setCountryModalVisible(true);
                                }}
                                activeOpacity={0.7}
                            >
                                <ResponsiveText variant="body" style={styles.flagText}>
                                    {selectedCountry.flag}
                                </ResponsiveText>
                                <ResponsiveText variant="bodySmall" style={styles.dialText}>
                                    {selectedCountry.dial}
                                </ResponsiveText>
                                <Icon name="chevron-down" size={16} color={colors.textSecondary} />
                            </TouchableOpacity>
                            <View style={styles.phoneInputWrapper}>
                                <TextInput
                                    style={styles.phoneInput}
                                    value={phone}
                                    onChangeText={setPhone}
                                    placeholder="Enter phone number"
                                    placeholderTextColor={colors.textSecondary}
                                    keyboardType="phone-pad"
                                />
                            </View>
                        </View>
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

                <Button
                    title="Save Changes"
                    onPress={handleSave}
                    loading={loading}
                    style={styles.saveBtn}
                    fullWidth
                />
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

            {/* Country Code Picker Modal */}
            <Modal
                visible={countryModalVisible}
                animationType="slide"
                transparent
                onRequestClose={() => setCountryModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalSheet}>
                        <View style={styles.modalHeader}>
                            <ResponsiveText variant="h4" style={styles.modalTitle}>
                                Select Country
                            </ResponsiveText>
                            <TouchableOpacity onPress={() => setCountryModalVisible(false)}>
                                <Icon name="close" size={22} color={colors.text} />
                            </TouchableOpacity>
                        </View>

                        {/* Search */}
                        <View style={styles.searchBox}>
                            <Icon name="magnify" size={18} color={colors.textSecondary} />
                            <TextInput
                                style={styles.searchInput}
                                value={countrySearch}
                                onChangeText={setCountrySearch}
                                placeholder="Search country..."
                                placeholderTextColor={colors.textSecondary}
                                autoCapitalize="none"
                            />
                        </View>

                        <FlatList
                            data={COUNTRY_CODES.filter(c =>
                                c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
                                c.dial.includes(countrySearch)
                            )}
                            keyExtractor={item => item.code}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={[
                                        styles.countryItem,
                                        selectedCountry.code === item.code && styles.countryItemActive,
                                    ]}
                                    onPress={() => {
                                        setSelectedCountry(item);
                                        setCountryModalVisible(false);
                                    }}
                                    activeOpacity={0.7}
                                >
                                    <ResponsiveText variant="body" style={styles.itemFlag}>
                                        {item.flag}
                                    </ResponsiveText>
                                    <ResponsiveText variant="body" style={styles.itemName}>
                                        {item.name}
                                    </ResponsiveText>
                                    <ResponsiveText variant="bodySmall" style={styles.itemDial}>
                                        {item.dial}
                                    </ResponsiveText>
                                    {selectedCountry.code === item.code && (
                                        <Icon name="check" size={18} color={colors.primary} />
                                    )}
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default EditProfileScreen;
