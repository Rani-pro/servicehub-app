import { StyleSheet } from 'react-native';
import { ComponentSizes } from '../../theme/theme';

export const getStyles = (
    backgroundColor: string,
    padding: number,
    shadow: object,
) =>
    StyleSheet.create({
        card: {
            backgroundColor,
            borderRadius: ComponentSizes.card.borderRadius,
            padding,
            width: '100%',
            ...shadow,
        },
    });
