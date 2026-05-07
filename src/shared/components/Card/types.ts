import { ViewStyle } from 'react-native';

export interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: 'none' | 'small' | 'medium' | 'large';
    shadow?: 'none' | 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}
