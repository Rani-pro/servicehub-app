import { ViewStyle } from 'react-native';

export interface GridProps {
    children: React.ReactNode;
    style?: ViewStyle;
    spacing?: number;
    numColumns?: number;
}
