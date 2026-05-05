import React from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, ComponentSizes, Spacing, Shadows } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';

interface InputProps {
    label?: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    error?: string;
    style?: ViewStyle;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
    autoCorrect?: boolean;
    rightIcon?: string;
    onRightIconPress?: () => void;
    multiline?: boolean;
    numberOfLines?: number;
    size?: 'small' | 'medium' | 'large';
}

const Input: React.FC<InputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    error,
    style,
    autoCapitalize = 'sentences',
    keyboardType = 'default',
    autoCorrect = true,
    rightIcon,
    onRightIconPress,
    multiline = false,
    numberOfLines = 1,
    size = 'medium',
}) => {
    const { colors } = useTheme();
    const { isSmallDevice } = useResponsive();

    const getInputHeight = () => {
        const baseHeight = ComponentSizes.input.height;
        switch (size) {
            case 'small':
                return baseHeight * 0.8; // 20% smaller
            case 'large':
                return baseHeight * 1.2; // 20% larger
            default:
                return baseHeight; // medium size
        }
    };

    const inputHeight = multiline 
        ? getInputHeight() * numberOfLines 
        : getInputHeight();

    const styles = StyleSheet.create({
        container: {
            marginVertical: size === 'small' ? Spacing.xs : Spacing.s,
            width: '100%',
        },
        label: {
            fontSize: size === 'small' ? Typography.caption.fontSize : Typography.bodySmall.fontSize,
            color: colors.text,
            marginBottom: Spacing.xs,
            fontWeight: '500',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            minHeight: inputHeight,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: ComponentSizes.input.borderRadius,
            backgroundColor: colors.white,
            paddingHorizontal: size === 'small' ? ComponentSizes.input.paddingHorizontal * 0.8 : ComponentSizes.input.paddingHorizontal,
            paddingVertical: multiline ? Spacing.s : Spacing.xs,
            ...Shadows.small,
        },
        input: {
            flex: 1,
            minHeight: multiline ? inputHeight - (Spacing.s * 2) : inputHeight - (Spacing.xs * 2),
            fontSize: size === 'small' ? Typography.bodySmall.fontSize : Typography.body.fontSize,
            color: colors.text,
            textAlignVertical: multiline ? 'top' : 'center',
            paddingVertical: 0, // Remove default padding to control height precisely
            includeFontPadding: false, // Android specific - removes extra padding
        },
        iconContainer: {
            paddingLeft: Spacing.s,
            paddingTop: multiline ? Spacing.xs : 0,
        },
        inputError: {
            borderColor: colors.danger,
            borderWidth: 1.5,
        },
        errorText: {
            color: colors.danger,
            fontSize: Typography.caption.fontSize,
            marginTop: Spacing.xs,
            marginLeft: Spacing.xs,
        },
    });

    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}
            <View style={[styles.inputContainer, error ? styles.inputError : null]}>
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textSecondary}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize}
                    keyboardType={keyboardType}
                    autoCorrect={autoCorrect}
                    multiline={multiline}
                    numberOfLines={multiline ? numberOfLines : 1}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
                        <Icon 
                            name={rightIcon} 
                            size={size === 'small' ? ComponentSizes.icon.small : ComponentSizes.icon.medium} 
                            color={colors.textSecondary} 
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

export default Input;