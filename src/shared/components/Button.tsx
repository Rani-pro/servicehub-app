import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { LightColors, DarkColors, Typography, ComponentSizes, Shadows } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';

interface ButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
    variant?: 'primary' | 'secondary' | 'danger' | 'outline';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
    title,
    onPress,
    loading,
    disabled,
    style,
    textStyle,
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
}) => {
    const { colors } = useTheme();
    const { isSmallDevice } = useResponsive();

    const getButtonStyles = () => {
        const baseHeight = ComponentSizes.button.height;
        const height = size === 'small' ? baseHeight * 0.8 : 
                     size === 'large' ? baseHeight * 1.2 : baseHeight;

        let backgroundColor = colors.primary;
        let textColor = colors.white;
        let borderColor = 'transparent';

        switch (variant) {
            case 'secondary':
                backgroundColor = colors.secondary;
                break;
            case 'danger':
                backgroundColor = colors.danger;
                break;
            case 'outline':
                backgroundColor = 'transparent';
                textColor = colors.primary;
                borderColor = colors.primary;
                break;
        }

        return {
            height,
            backgroundColor,
            textColor,
            borderColor,
            borderWidth: variant === 'outline' ? 1 : 0,
        };
    };

    const buttonStyles = getButtonStyles();

    const styles = StyleSheet.create({
        button: {
            height: buttonStyles.height,
            borderRadius: ComponentSizes.button.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: ComponentSizes.button.paddingHorizontal,
            marginVertical: isSmallDevice ? 8 : 10,
            backgroundColor: buttonStyles.backgroundColor,
            borderWidth: buttonStyles.borderWidth,
            borderColor: buttonStyles.borderColor,
            width: fullWidth ? '100%' : undefined,
            minWidth: isSmallDevice ? 120 : 140,
            ...Shadows.small,
        },
        disabled: {
            opacity: 0.6,
        },
        text: {
            color: buttonStyles.textColor,
            fontSize: Typography.button.fontSize,
            fontWeight: Typography.button.fontWeight,
            lineHeight: Typography.button.lineHeight,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.button, disabled && styles.disabled, style]}
            onPress={onPress}
            disabled={disabled || loading}
            activeOpacity={0.8}
        >
            {loading ? (
                <ActivityIndicator color={buttonStyles.textColor} />
            ) : (
                <Text style={[styles.text, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;
