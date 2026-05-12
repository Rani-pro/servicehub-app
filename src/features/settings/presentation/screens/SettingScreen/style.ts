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
    avatarWrapper: {
        position: 'relative',
        marginBottom: Spacing.m,
    },
    avatar: {
        width: responsiveScale(80),
        height: responsiveScale(80),
        borderRadius: responsiveScale(40),
        backgroundColor: colors.primary + '20',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.primary,
        overflow: 'hidden',
    },
    avatarImage: {
        width: responsiveScale(80),
        height: responsiveScale(80),
        borderRadius: responsiveScale(40),
    },
    cameraBadge: {
        position: 'absolute',
        bottom: 2,
        right: 2,
        width: 26,
        height: 26,
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.background,
        ...Shadows.small,
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
        marginBottom: Spacing.s,
    },
    sectionTitle: {
        ...Typography.h4,
        color: colors.text,
        marginBottom: Spacing.m,
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
});
