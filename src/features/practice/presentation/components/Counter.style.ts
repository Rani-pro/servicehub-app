import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        padding: Spacing.m,
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginVertical: Spacing.s,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    label: {
        fontSize: 16,
        color: Colors.textSecondary,
        marginBottom: Spacing.s,
    },
    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: Colors.primary,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold',
    },
    countText: {
        fontSize: 24,
        fontWeight: '600',
        color: Colors.text,
    },
});
