import React, { useState } from 'react';
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { getStyles } from './style';
import Input from '../../../../../shared/components/Input';
import Button from '../../../../../shared/components/Button';
import Card from '../../../../../shared/components/Card';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { authRepository } from '../../../data/AuthRepository';
import { setUser, setError } from '../../../store/authSlice';
import { crashlyticsRepository } from '../../../../../core/crashlyticsRepository';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [loading, setLocalLoading] = useState(false);
    const dispatch = useDispatch();
    const { colors } = useTheme();
    const { isSmallDevice } = useResponsive();
    const styles = getStyles(colors);

    // ─── Auth ────────────────────────────────────────────────────────────────

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters');
            return;
        }

        setLocalLoading(true);

        const action = isRegistering ? 'sign_up' : 'login';
        crashlyticsRepository.log(`[LoginScreen] ${action} attempt for ${email}`);

        try {
            let user;
            if (isRegistering) {
                user = await authRepository.signUp(email.trim(), password);
            } else {
                user = await authRepository.login(email.trim(), password);
            }

            // ── Crashlytics: tag session with authenticated user ──
            await crashlyticsRepository.setUserId(user.id ?? user.email ?? email);
            await crashlyticsRepository.setAttributes({
                last_action: action,
                user_email: email,
            });
            crashlyticsRepository.log(`[LoginScreen] ${action} succeeded`);

            dispatch(setUser(user));
        } catch (error: any) {
            // ── Crashlytics: record non-fatal auth error ──
            const jsError =
                error instanceof Error ? error : new Error(String(error));
            await crashlyticsRepository.recordError(jsError, 'LoginScreen.handleAuth');

            dispatch(setError(error.message));

            if (
                isRegistering &&
                (error.code === 'auth/email-already-in-use' ||
                    error.message?.includes('already in use'))
            ) {
                Alert.alert(
                    'Account Exists',
                    'An account with this email already exists. Would you like to login instead?',
                    [
                        { text: 'Cancel', style: 'cancel' },
                        {
                            text: 'Yes, Login',
                            onPress: () => setIsRegistering(false),
                        },
                    ],
                );
            } else {
                Alert.alert(
                    isRegistering ? 'Sign Up Failed' : 'Login Failed',
                    error.message,
                );
            }
        } finally {
            setLocalLoading(false);
        }
    };

    // ─── Forgot password ─────────────────────────────────────────────────────

    const handleForgotPassword = async () => {
        if (!email.trim()) {
            Alert.alert('Forgot Password', 'Please enter your email address first.');
            return;
        }

        crashlyticsRepository.log(
            `[LoginScreen] password reset requested for ${email}`,
        );

        try {
            await authRepository.sendPasswordResetEmail(email);
            Alert.alert(
                'Reset Email Sent',
                'Please check your inbox for instructions to reset your password.',
            );
        } catch (error: any) {
            const jsError =
                error instanceof Error ? error : new Error(String(error));
            await crashlyticsRepository.recordError(
                jsError,
                'LoginScreen.handleForgotPassword',
            );
            Alert.alert('Error', error.message);
        }
    };

    // ─── Render ──────────────────────────────────────────────────────────────

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header}>
                    <ResponsiveText variant="h1" align="center" style={styles.title}>
                        {isRegistering ? 'Create Account' : 'Welcome Back'}
                    </ResponsiveText>
                    <ResponsiveText variant="body" align="center" color={colors.textSecondary}>
                        {isRegistering
                            ? 'Register to start your journey'
                            : 'Sign in to your account'}
                    </ResponsiveText>
                </View>

                {/* Login / Sign-up toggle */}
                <View style={styles.toggleContainer}>
                    <TouchableOpacity
                        onPress={() => setIsRegistering(false)}
                        style={[
                            styles.toggleButton,
                            !isRegistering && styles.toggleButtonActive
                        ]}
                    >
                        <ResponsiveText
                            variant="button"
                            color={!isRegistering ? '#fff' : colors.textSecondary}
                        >
                            Login
                        </ResponsiveText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setIsRegistering(true)}
                        style={[
                            styles.toggleButton,
                            isRegistering && styles.toggleButtonActive
                        ]}
                    >
                        <ResponsiveText
                            variant="button"
                            color={isRegistering ? '#fff' : colors.textSecondary}
                        >
                            Sign Up
                        </ResponsiveText>
                    </TouchableOpacity>
                </View>

                <Card style={styles.formCard}>
                    <Input
                        label="Email Address"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="your@email.com"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        autoCorrect={false}
                        size="small"
                    />

                    <Input
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Password"
                        secureTextEntry={!showPassword}
                        autoCapitalize="none"
                        rightIcon={showPassword ? 'eye' : 'eye-off'}
                        onRightIconPress={() => setShowPassword(!showPassword)}
                        size="small"
                    />

                    <View pointerEvents={isRegistering ? 'none' : 'auto'}>
                        <TouchableOpacity
                            onPress={handleForgotPassword}
                            style={[
                                styles.forgotPasswordButton,
                                { opacity: isRegistering ? 0 : 1 }
                            ]}
                            disabled={isRegistering}
                        >
                            <ResponsiveText variant="bodySmall" color={colors.primary}>
                                Forgot Password?
                            </ResponsiveText>
                        </TouchableOpacity>
                    </View>

                    <Button
                        title={isRegistering ? 'Create Account' : 'Sign In'}
                        onPress={handleAuth}
                        loading={loading}
                        size="small"
                    />

                    <TouchableOpacity
                        onPress={() => setIsRegistering(!isRegistering)}
                        style={styles.switchContainer}
                    >
                        <ResponsiveText variant="bodySmall" color={colors.textSecondary}>
                            {isRegistering
                                ? 'Already have an account? '
                                : "Don't have an account? "}
                            <ResponsiveText variant="bodySmall" color={colors.primary}>
                                {isRegistering ? 'Login' : 'Sign Up'}
                            </ResponsiveText>
                        </ResponsiveText>
                    </TouchableOpacity>
                </Card>

                <View style={styles.footer}>
                    <ResponsiveText variant="caption" color={colors.textSecondary}>
                        MyApp v1.0
                    </ResponsiveText>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default LoginScreen;
