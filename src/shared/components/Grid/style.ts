import { StyleSheet } from 'react-native';

export const getStyles = (spacing: number, cardWidth: number) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: spacing,
        },
        item: {
            width: cardWidth,
        },
    });
