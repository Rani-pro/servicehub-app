import React from 'react';
import { View, ViewStyle } from 'react-native';
import { ComponentSizes, Shadows } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';
import { getStyles } from './style';

interface CardProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: 'none' | 'small' | 'medium' | 'large';
    shadow?: 'none' | 'small' | 'medium' | 'large';
    fullWidth?: boolean;
}

const Card: React.FC<CardProps> = ({
    children,
    style,
    padding = 'medium',
    shadow = 'medium',
    fullWidth = true,
}) => {
    const { colors } = useTheme();

    const getPadding = () => {
        switch (padding) {
            case 'none': return 0;
            case 'small': return ComponentSizes.card.padding * 0.3;
            case 'large': return ComponentSizes.card.padding * 1.0;
            default: return ComponentSizes.card.padding * 0.6;
        }
    };

    const getShadow = () => {
        switch (shadow) {
            case 'none': return {};
            case 'small': return Shadows.small;
            case 'large': return Shadows.large;
            default: return Shadows.medium;
        }
    };

    const styles = getStyles(colors.white, getPadding(), getShadow());

    return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;
