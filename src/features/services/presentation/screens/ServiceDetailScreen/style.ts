import { StyleSheet } from 'react-native';
import { Spacing, Typography } from '../../../../../shared/theme/theme';

export const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: Spacing.l,
    },
    category: {
        ...Typography.caption,
        color: colors.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: Spacing.s,
    },
    name: {
        ...Typography.h2,
        color: colors.text,
        marginBottom: Spacing.s,
    },
    price: {
        ...Typography.h3,
        color: colors.success,
        marginBottom: Spacing.m,
    },
    divider: {
        height: 1,
        backgroundColor: colors.border,
        marginVertical: Spacing.l,
    },
    sectionTitle: {
        ...Typography.h4,
        color: colors.text,
        marginBottom: Spacing.m,
    },
    description: {
        ...Typography.body,
        color: colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
    },
    bookButton: {
        backgroundColor: colors.primary,
        padding: Spacing.m,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Spacing.l,
    },
    bookButtonText: {
        ...Typography.button,
        color: '#FFFFFF',
    },
});
