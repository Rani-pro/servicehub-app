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
    timeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
        marginVertical: Spacing.m,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    button: {
        paddingHorizontal: Spacing.l,
        paddingVertical: Spacing.s,
        borderRadius: 4,
        minWidth: 100,
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: Colors.success,
    },
    stopButton: {
        backgroundColor: Colors.danger,
    },
    resetButton: {
        paddingVertical: Spacing.s,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontWeight: '600',
    },
    resetText: {
        color: Colors.primary,
        fontWeight: '600',
    },
});
