import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows, Typography } from '../../theme/theme';

export const getStyles = (
    buttonStyles: {
        height: number;
        backgroundColor: string;
        textColor: string;
        borderColor: string;
        borderWidth: number;
    },
    fullWidth: boolean,
    isSmallDevice: boolean,
) =>
    StyleSheet.create({
        button: {
            height: buttonStyles.height,
            borderRadius: ComponentSizes.button.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: ComponentSizes.button.paddingHorizontal,
            marginVertical: isSmallDevice ? 8 : 10,
            backgroundColor: buttonStyles.backgroundColor,
            borderWidth: buttonStyles.borderWidth,
            borderColor: buttonStyles.borderColor,
            width: fullWidth ? '100%' : undefined,
            minWidth: isSmallDevice ? 120 : 140,
            ...Shadows.small,
        },
        disabled: {
            opacity: 0.6,
        },
        text: {
            color: buttonStyles.textColor,
            fontSize: Typography.button.fontSize,
            fontWeight: Typography.button.fontWeight,
            lineHeight: Typography.button.lineHeight,
        },
    });
