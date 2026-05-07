import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { Typography } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';

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

    const getTextStyle = () => {
        const baseStyle = Typography[variant];
        return {
            ...baseStyle,
            color: color || colors.text,
            textAlign: align,
        };
    };

    const styles = StyleSheet.create({
        text: getTextStyle(),
    });

    return (
        <RNText
            style={[styles.text, style]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
        >
            {children}
        </RNText>
    );
};

export default ResponsiveText;