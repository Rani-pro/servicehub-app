import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.l,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        marginTop: Spacing.m,
        marginBottom: Spacing.s,
    },
    message: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.l,
    },
    detailBox: {
        width: '100%',
        backgroundColor: Colors.secondaryBackground,
        borderRadius: 12,
        padding: Spacing.m,
        marginBottom: Spacing.l,
        gap: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: Spacing.s,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    noticeText: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.l,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: Spacing.xl,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});
