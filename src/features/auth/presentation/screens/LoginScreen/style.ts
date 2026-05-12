import { StyleSheet } from 'react-native';
import { Spacing, ComponentSizes } from '../../../../../shared/theme/theme';
import { responsiveWidth, responsiveHeight } from '../../../../../shared/utils/responsive';

export const getStyles = (colors: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingHorizontal: responsiveWidth(6),
        paddingVertical: Spacing.m,
        justifyContent: 'center',
        minHeight: responsiveHeight(100),
    },
    header: {
        marginBottom: Spacing.l,
        alignItems: 'center',
        minHeight: 100,
        justifyContent: 'center',
    },
    title: {
        color: colors.primary,
        marginBottom: Spacing.xs,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginBottom: Spacing.m,
        backgroundColor: colors.secondaryBackground,
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
        backgroundColor: colors.primary,
    },
    formCard: {
        marginBottom: Spacing.m,
    },
    forgotPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: Spacing.xs,
        paddingVertical: Spacing.xs,
    },
    switchContainer: {
        marginTop: Spacing.m,
        alignItems: 'center',
        paddingVertical: Spacing.s,
    },
    footer: {
        alignItems: 'center',
        marginTop: Spacing.m,
    },
});
