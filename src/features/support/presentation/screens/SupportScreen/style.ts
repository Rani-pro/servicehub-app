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
        heroIcon: {
            width: responsiveScale(64),
            height: responsiveScale(64),
            borderRadius: responsiveScale(32),
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: Spacing.m,
        },
        heroTitle: {
            ...Typography.h3,
            color: colors.text,
            textAlign: 'center',
            marginBottom: Spacing.xs,
        },
        heroSubtitle: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            textAlign: 'center',
        },
        sectionTitle: {
            ...Typography.h4,
            color: colors.text,
            marginBottom: Spacing.m,
        },
        menuSection: {
            marginBottom: Spacing.l,
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
        faqItem: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            marginBottom: Spacing.s,
            overflow: 'hidden',
            ...Shadows.small,
        },
        faqHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: Spacing.m,
        },
        faqQuestion: {
            ...Typography.body,
            flex: 1,
            color: colors.text,
            fontWeight: '500',
        },
        faqAnswer: {
            ...Typography.bodySmall,
            paddingHorizontal: Spacing.m,
            paddingBottom: Spacing.m,
            color: colors.textSecondary,
        },
        divider: {
            height: 1,
            backgroundColor: colors.border,
            marginHorizontal: Spacing.m,
        },
    });
