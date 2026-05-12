import { StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, FontFamily } from '../../../../shared/theme/theme';
import { getFontSize } from '../../../../shared/utils/responsive';

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
        ...Typography.caption,
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
        fontSize: getFontSize(12),
        fontFamily: FontFamily.mono,
        color: '#1e40af',
    },
    outputText: {
        ...Typography.caption,
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
