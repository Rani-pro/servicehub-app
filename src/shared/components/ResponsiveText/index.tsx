import React from 'react';
import { Text as RNText, TextStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { getStyles } from './style';

interface ResponsiveTextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';
    style?: TextStyle;
    color?: string;
    align?: 'left' | 'center' | 'right' | 'justify';
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const ResponsiveText: React.FC<ResponsiveTextProps> = ({
    children,
    variant = 'body',
    style,
    color,
    align = 'left',
    numberOfLines,
    ellipsizeMode,
}) => {
    const { colors } = useTheme();
    const styles = getStyles(variant, color || colors.text, align);

    return (
        <RNText style={[styles.text, style]} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>
            {children}
        </RNText>
    );
};

export default ResponsiveText;
