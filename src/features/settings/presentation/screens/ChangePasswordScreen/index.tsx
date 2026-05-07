import { useNavigation } from '@react-navigation/native';
import { useMemo, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { z } from 'zod';
import Button from '../../../../../shared/components/Button';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import Input from '../../../../../shared/components/Input';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { ChangePasswordFormSchema } from '../../../../../shared/schema';
import { Spacing } from '../../../../../shared/theme/theme';
import { settingsRepository } from '../../../data/SettingsRepository';
import { getStyles } from './style';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);

    const { isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = useMemo(() => getStyles(isLandscape, colors), [isLandscape, screenWidth, colors]);

    const handleChangePassword = async () => {
        try {
            ChangePasswordFormSchema.parse({
                currentPassword,
                newPassword,
                confirmPassword,
            });
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                Alert.alert('Validation Error', error.issues[0].message);
            }
            return;
        }

        setLoading(true);
        try {
            await settingsRepository.changePassword(newPassword);
            Alert.alert('Success', 'Your password has been updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <CommonHeader
                title="Change Password"
                leftElement="back"
                rightElement="none"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.content,
                        {
                            paddingLeft: Math.max(Spacing.m, insets.left + Spacing.s),
                            paddingRight: Math.max(Spacing.m, insets.right + Spacing.s),
                            paddingBottom: Math.max(Spacing.xl, insets.bottom + Spacing.m),
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.infoCard}>
                        <Icon
                            name="shield-lock-outline"
                            size={isLandscape ? 30 : 40}
                            color={colors.primary}
                        />
                        <ResponsiveText
                            variant="bodySmall"
                            style={styles.infoText}
                            align="center"
                        >
                            Choose a strong password with at least 6 characters to keep your account secure.
                        </ResponsiveText>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Current Password"
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholder="Enter current password"
                            secureTextEntry={!showPasswords}
                            rightIcon={showPasswords ? 'eye' : 'eye-off'}
                            onRightIconPress={() => setShowPasswords(!showPasswords)}
                        />

                        <Input
                            label="New Password"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholder="Enter new password"
                            secureTextEntry={!showPasswords}
                        />

                        <Input
                            label="Confirm New Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Repeat new password"
                            secureTextEntry={!showPasswords}
                        />

                        <Button
                            title="Update Password"
                            onPress={handleChangePassword}
                            loading={loading}
                            style={styles.submitButton}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChangePasswordScreen;
