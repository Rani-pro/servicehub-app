import { StyleSheet } from 'react-native';
import { Spacing } from '../../../../../shared/theme/theme';

export const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        padding: Spacing.m,
    },
    infoCard: {
        backgroundColor: colors.primary + '15',
        padding: Spacing.m,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: Spacing.l,
        borderWidth: 1,
        borderColor: colors.primary + '30',
    },
    infoText: {
        color: colors.text,
        textAlign: 'center',
        marginTop: Spacing.s,
        lineHeight: 20,
    },
    form: {
        backgroundColor: colors.secondaryBackground,
        padding: Spacing.m,
        borderRadius: 16,
        elevation: 2,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    submitButton: {
        marginTop: Spacing.m,
    },
});
