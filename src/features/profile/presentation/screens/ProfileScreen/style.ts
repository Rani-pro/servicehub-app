import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows, Typography } from '../../../../../shared/theme/theme';
import { responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (colors: any, Spacing: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flex: 1,
        padding: Spacing.m,
    },
    profileCard: {
        backgroundColor: colors.secondaryBackground,
        borderRadius: ComponentSizes.card.borderRadius,
        padding: Spacing.l,
        alignItems: 'center',
        marginBottom: Spacing.l,
        ...Shadows.medium,
    },
    avatar: {
        width: responsiveScale(80),
        height: responsiveScale(80),
        borderRadius: responsiveScale(40),
        backgroundColor: colors.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.m,
    },
    userName: {
        ...Typography.h3,
        color: colors.text,
        marginBottom: Spacing.xs,
        textAlign: 'center',
    },
    userEmail: {
        ...Typography.body,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    menuSection: {
        marginTop: Spacing.s,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondaryBackground,
        padding: Spacing.m,
        borderRadius: ComponentSizes.card.borderRadius,
        marginBottom: Spacing.s,
        ...Shadows.small,
    },
    menuIcon: {
        width: responsiveScale(40),
        height: responsiveScale(40),
        borderRadius: responsiveScale(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Spacing.m,
    },
    menuContent: {
        flex: 1,
    },
    menuText: {
        ...Typography.body,
        color: colors.text,
        fontWeight: '500',
        marginBottom: Spacing.xs / 2,
    },
    menuSubtext: {
        ...Typography.bodySmall,
        color: colors.textSecondary,
    },
    chevron: {
        marginLeft: Spacing.s,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: colors.secondaryBackground,
        borderRadius: ComponentSizes.card.borderRadius,
        padding: Spacing.m,
        marginBottom: Spacing.m,
        ...Shadows.small,
    },
    statItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        paddingHorizontal: Spacing.xs,
    },
    statValue: {
        ...Typography.h4,
        color: colors.primary,
        marginBottom: Spacing.xs / 2,
    },
    statNumber: {
        ...Typography.h4,
        color: colors.primary,
        marginBottom: Spacing.xs / 2,
    },
    statLabel: {
        ...Typography.caption,
        color: colors.textSecondary,
        textAlign: 'center',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: colors.border,
    },
    sectionTitle: {
        ...Typography.h4,
        color: colors.text,
        marginBottom: Spacing.m,
    },
});