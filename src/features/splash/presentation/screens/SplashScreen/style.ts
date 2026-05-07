import { StyleSheet } from 'react-native';
import { Colors } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoText: {
        fontSize: 64,
        fontWeight: 'bold',
        color: '#FFFFFF',
        letterSpacing: 4,
    },
    tagline: {
        fontSize: 18,
        color: '#E1E4E8',
        marginTop: 8,
        fontWeight: '500',
    },
    loader: {
        position: 'absolute',
        bottom: 50,
    },
});
