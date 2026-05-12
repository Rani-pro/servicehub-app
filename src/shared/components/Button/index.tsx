import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { ComponentSizes } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';
import { useResponsive } from '../../hooks/useResponsive';
import { getStyles } from './style';

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
        const height =
            size === 'small' ? baseHeight * 0.8 : size === 'large' ? baseHeight * 1.2 : baseHeight;

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

        return { height, backgroundColor, textColor, borderColor, borderWidth: variant === 'outline' ? 1 : 0 };
    };

    const buttonStyles = getButtonStyles();
    const styles = getStyles(buttonStyles, fullWidth, isSmallDevice);

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
