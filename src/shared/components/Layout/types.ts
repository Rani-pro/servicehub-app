import { ViewStyle } from 'react-native';

export interface LayoutProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: 'none' | 'small' | 'medium' | 'large';
    scrollable?: boolean;
    safeArea?: boolean;
    backgroundColor?: string;
    showsVerticalScrollIndicator?: boolean;
}
