import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows } from '../../../../../shared/theme/theme';
import { responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (colors: any, Spacing: any, isLandscape: boolean = false) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        content: {
            flex: 1,
            paddingHorizontal: Spacing.m,
            paddingTop: Spacing.m,
        },
        // Landscape: horizontal layout; Portrait: vertical (centered)
        profileCard: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: isLandscape ? Spacing.m : Spacing.l,
            alignItems: 'center',
            flexDirection: isLandscape ? 'row' : 'column',
            marginBottom: Spacing.m,
            ...Shadows.medium,
        },
        profileInfo: {
            flex: isLandscape ? 1 : undefined,
            alignItems: isLandscape ? 'flex-start' : 'center',
            marginLeft: isLandscape ? Spacing.m : 0,
        },
        avatarWrapper: {
            position: 'relative',
            marginBottom: isLandscape ? 0 : Spacing.m,
        },
        avatar: {
            width: isLandscape ? responsiveScale(55) : responsiveScale(80),
            height: isLandscape ? responsiveScale(55) : responsiveScale(80),
            borderRadius: isLandscape ? responsiveScale(27) : responsiveScale(40),
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: colors.primary,
            overflow: 'hidden',
        },
        avatarImage: {
            width: isLandscape ? responsiveScale(55) : responsiveScale(80),
            height: isLandscape ? responsiveScale(55) : responsiveScale(80),
            borderRadius: isLandscape ? responsiveScale(27) : responsiveScale(40),
        },
        cameraBadge: {
            position: 'absolute',
            bottom: 2,
            right: 2,
            width: 24,
            height: 24,
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: colors.background,
            ...Shadows.small,
        },
        userName: {
            fontWeight: '600',
            color: colors.text,
            marginBottom: Spacing.xs / 2,
            textAlign: isLandscape ? 'left' : 'center',
        },
        userEmail: {
            color: colors.textSecondary,
            textAlign: isLandscape ? 'left' : 'center',
        },
        menuSection: {
            marginTop: Spacing.xs,
            marginBottom: Spacing.xs,
        },
        sectionTitle: {
            fontSize: responsiveScale(isLandscape ? 15 : 18),
            fontWeight: '600',
            color: colors.text,
            marginBottom: isLandscape ? Spacing.xs : Spacing.m,
        },
        menuItem: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.secondaryBackground,
            padding: isLandscape ? Spacing.s : Spacing.m,
            borderRadius: ComponentSizes.card.borderRadius,
            marginBottom: isLandscape ? Spacing.xs : Spacing.s,
            ...Shadows.small,
        },
        menuIcon: {
            width: responsiveScale(isLandscape ? 32 : 40),
            height: responsiveScale(isLandscape ? 32 : 40),
            borderRadius: responsiveScale(isLandscape ? 16 : 20),
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: Spacing.m,
        },
        menuContent: {
            flex: 1,
        },
        menuText: {
            fontSize: responsiveScale(isLandscape ? 14 : 16),
            color: colors.text,
            fontWeight: '500',
            marginBottom: Spacing.xs / 2,
        },
        menuSubtext: {
            fontSize: responsiveScale(isLandscape ? 11 : 14),
            color: colors.textSecondary,
        },
        chevron: {
            marginLeft: Spacing.s,
        },
        logoutButton: {
            marginTop: Spacing.s,
            marginHorizontal: Spacing.xs,
            marginBottom: Spacing.xs,
        },
    });
