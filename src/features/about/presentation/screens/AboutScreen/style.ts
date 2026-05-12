import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows, Typography } from '../../../../../shared/theme/theme';
import { responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (colors: any, Spacing: any) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            padding: Spacing.m,
        },
        heroCard: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: Spacing.l,
            alignItems: 'center',
            marginBottom: Spacing.l,
            ...Shadows.medium,
        },
        appIcon: {
            width: responsiveScale(72),
            height: responsiveScale(72),
            borderRadius: responsiveScale(20),
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.m,
        },
        appName: {
            ...Typography.h3,
            color: colors.text,
            textAlign: 'center',
            marginBottom: Spacing.xs,
        },
        appVersion: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            textAlign: 'center',
        },
        appTagline: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            textAlign: 'center',
            marginTop: Spacing.xs,
        },
        section: {
            marginBottom: Spacing.l,
        },
        sectionTitle: {
            ...Typography.h4,
            color: colors.text,
            marginBottom: Spacing.m,
        },
        descriptionCard: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: Spacing.m,
            ...Shadows.small,
        },
        descriptionText: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
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
            marginBottom: 2,
        },
        menuSubtext: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
        },
        chevron: {
            marginLeft: Spacing.s,
        },
        statsRow: {
            flexDirection: 'row',
            gap: Spacing.s,
            marginBottom: Spacing.l,
        },
        statCard: {
            flex: 1,
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: Spacing.m,
            alignItems: 'center',
            ...Shadows.small,
        },
        statValue: {
            ...Typography.h3,
            color: colors.primary,
            marginBottom: 2,
        },
        statLabel: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            textAlign: 'center',
        },
        copyrightText: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            textAlign: 'center',
            marginBottom: Spacing.l,
        },
    });
