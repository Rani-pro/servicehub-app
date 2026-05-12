import React from 'react';
import { View, TextInput, Text, ViewStyle, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ComponentSizes } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';
import { getStyles } from './style';

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

    const getInputHeight = () => {
        const baseHeight = ComponentSizes.input.height;
        switch (size) {
            case 'small': return baseHeight * 0.8;
            case 'large': return baseHeight * 1.2;
            default: return baseHeight;
        }
    };

    const inputHeight = multiline ? getInputHeight() * numberOfLines : getInputHeight();
    const styles = getStyles(colors, size, inputHeight, multiline);

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
                    textAlignVertical={multiline ? 'top' : 'center'}
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
