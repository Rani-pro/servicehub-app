import { StyleSheet } from 'react-native';

export const getStyles = (backgroundColor: string, padding: number) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor,
            padding,
        },
        scrollContent: {
            flexGrow: 1,
        },
    });
