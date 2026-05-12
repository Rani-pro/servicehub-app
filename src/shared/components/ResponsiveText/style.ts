import { StyleSheet } from 'react-native';
import { Typography } from '../../theme/theme';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySmall' | 'caption' | 'button';

export const getStyles = (
    variant: TypographyVariant,
    color: string,
    align: 'left' | 'center' | 'right' | 'justify',
) =>
    StyleSheet.create({
        text: {
            ...Typography[variant],
            color,
            textAlign: align,
        },
    });
