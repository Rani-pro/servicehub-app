import { StyleSheet } from 'react-native';
import { LightColors, Spacing, ComponentSizes, Shadows } from '../../../../../shared/theme/theme';
import { responsiveWidth, responsiveHeight } from '../../../../../shared/utils/responsive';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LightColors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: responsiveWidth(6), // 6% of screen width
        paddingVertical: Spacing.l,
        justifyContent: 'center',
        minHeight: responsiveHeight(100),
    },
    header: {
        marginBottom: Spacing.xl,
        alignItems: 'center',
    },
    title: {
        color: LightColors.primary,
        marginBottom: Spacing.xs,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.l,
        backgroundColor: LightColors.secondaryBackground,
        borderRadius: ComponentSizes.button.borderRadius,
        padding: 4,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: Spacing.s + 2,
        alignItems: 'center',
        borderRadius: ComponentSizes.button.borderRadius - 2,
    },
    toggleButtonActive: {
        backgroundColor: LightColors.primary,
    },
    formCard: {
        marginBottom: Spacing.l,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.m,
        paddingVertical: Spacing.xs,
    },
    switchContainer: {
        marginTop: Spacing.m,
        alignItems: 'center',
        paddingVertical: Spacing.s,
    },
    footer: {
        alignItems: 'center',
        marginTop: Spacing.xl,
    },
});
