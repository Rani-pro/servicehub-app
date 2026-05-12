import React, { useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Input from '../../../../../shared/components/Input';
import Button from '../../../../../shared/components/Button';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { settingsRepository } from '../../../data/SettingsRepository';
import { getStyles } from './style';
import { useTheme } from '../../../../../shared/hooks/useTheme';

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const styles = getStyles(colors);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswords, setShowPasswords] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChangePassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'New password must be at least 6 characters long');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await settingsRepository.changePassword(newPassword);
            Alert.alert('Success', 'Your password has been updated successfully', [
                { text: 'OK', onPress: () => navigation.goBack() }
            ]);
        } catch (error: any) {
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title="Change Password"
                leftElement="back"
                rightElement="none"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.infoCard}>
                        <Icon name="shield-lock-outline" size={40} color={colors.primary} />
                        <Text style={styles.infoText}>
                            Choose a strong password with at least 6 characters to keep your account secure.
                        </Text>
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
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;
