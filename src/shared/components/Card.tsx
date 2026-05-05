import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { ComponentSizes, Shadows } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';
import { useResponsive } from '../hooks/useResponsive';

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
    const { cardWidth } = useResponsive();

    const getPadding = () => {
        switch (padding) {
            case 'none':
                return 0;
            case 'small':
                return ComponentSizes.card.padding * 0.5;
            case 'large':
                return ComponentSizes.card.padding * 1.5;
            default:
                return ComponentSizes.card.padding;
        }
    };

    const getShadow = () => {
        switch (shadow) {
            case 'none':
                return {};
            case 'small':
                return Shadows.small;
            case 'large':
                return Shadows.large;
            default:
                return Shadows.medium;
        }
    };

    const styles = StyleSheet.create({
        card: {
            backgroundColor: colors.white,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: getPadding(),
            width: fullWidth ? '100%' : cardWidth,
            ...getShadow(),
        },
    });

    return (
        <View style={[styles.card, style]}>
            {children}
        </View>
    );
};

export default Card;