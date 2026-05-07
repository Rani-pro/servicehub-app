import { StyleSheet } from 'react-native';
import { ComponentSizes, Spacing } from '../../../../../shared/theme/theme';
import { responsiveHeight, responsiveWidth } from '../../../../../shared/utils/responsive';

// Accept isLandscape and colors to be fully theme-aware
export const getStyles = (isLandscape: boolean = false, colors?: any) => {
    const c = colors ?? {
        background: '#FFFFFF',
        secondaryBackground: '#F3F4F6',
        primary: '#22C55E',
    };
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.background,
        },
        scrollContainer: {
            flexGrow: 1,
            padding: responsiveWidth(isLandscape ? 10 : 6),
            justifyContent: 'center',
            minHeight: isLandscape ? undefined : responsiveHeight(100),
        },
        header: {
            marginBottom: isLandscape ? Spacing.m : Spacing.xl,
            alignItems: 'center',
        },
        title: {
            color: c.primary,
            marginBottom: Spacing.xs,
        },
        toggleContainer: {
            flexDirection: 'row',
            marginBottom: isLandscape ? Spacing.s : Spacing.l,
            backgroundColor: c.secondaryBackground,
            borderRadius: ComponentSizes.button.borderRadius,
            padding: 4,
        },
        toggleButton: {
            flex: 1,
            paddingVertical: isLandscape ? Spacing.xs : Spacing.s + 2,
            alignItems: 'center',
            borderRadius: ComponentSizes.button.borderRadius - 2,
        },
        toggleButtonActive: {
            backgroundColor: c.primary,
        },
        formCard: {
            marginBottom: isLandscape ? Spacing.s : Spacing.l,
        },
        forgotPasswordButton: {
            alignSelf: 'flex-end',
            marginBottom: Spacing.m,
            paddingVertical: Spacing.xs,
        },
        switchContainer: {
            marginTop: isLandscape ? Spacing.s : Spacing.m,
            alignItems: 'center',
            paddingVertical: Spacing.s,
        },
        footer: {
            alignItems: 'center',
            marginTop: isLandscape ? Spacing.m : Spacing.xl,
        },
    });
};

// Keep the old static 'styles' export for backward-compat
export const styles = getStyles(false);
