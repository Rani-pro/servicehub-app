import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        padding: Spacing.m,
        backgroundColor: Colors.white,
        borderRadius: 8,
        marginVertical: Spacing.s,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    sectionLabel: {
        fontSize: 13,
        fontWeight: '700',
        color: Colors.primary,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.xs,
        marginTop: Spacing.s,
    },
    codeBlock: {
        backgroundColor: Colors.secondaryBackground,
        borderRadius: 6,
        padding: Spacing.s,
        marginBottom: Spacing.xs,
    },
    codeText: {
        fontSize: 12,
        fontFamily: 'monospace',
        color: '#1e40af',
    },
    outputText: {
        fontSize: 13,
        color: Colors.textSecondary,
        marginTop: Spacing.xs,
        paddingLeft: Spacing.xs,
    },
    highlight: {
        color: Colors.success,
        fontWeight: '600',
    },
    divider: {
        height: 1,
        backgroundColor: Colors.border,
        marginVertical: Spacing.s,
    },
});
