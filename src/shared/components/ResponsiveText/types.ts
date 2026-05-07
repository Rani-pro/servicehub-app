import { TextStyle } from 'react-native';

export interface ResponsiveTextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';
    style?: TextStyle;
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}
