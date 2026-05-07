import { ViewStyle } from 'react-native';

export interface InputProps {
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
