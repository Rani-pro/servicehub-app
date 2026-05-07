import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows, Spacing, Typography } from '../../theme/theme';

export const getStyles = (
    colors: { text: string; border: string; white: string; danger: string; textSecondary: string },
    size: 'small' | 'medium' | 'large',
    inputHeight: number,
    multiline: boolean,
) =>
    StyleSheet.create({
        container: {
            marginVertical: size === 'small' ? Spacing.xs : Spacing.s,
            width: '100%',
        },
        label: {
            fontSize:
                size === 'small' ? Typography.caption.fontSize : Typography.bodySmall.fontSize,
            color: colors.text,
            marginBottom: Spacing.xs,
            fontWeight: '500',
        },
        inputContainer: {
            flexDirection: 'row',
            alignItems: multiline ? 'flex-start' : 'center',
            minHeight: inputHeight,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: ComponentSizes.input.borderRadius,
            backgroundColor: colors.white,
            paddingHorizontal:
                size === 'small'
                    ? ComponentSizes.input.paddingHorizontal * 0.8
                    : ComponentSizes.input.paddingHorizontal,
            paddingVertical: multiline ? Spacing.s : Spacing.xs,
            ...Shadows.small,
        },
        input: {
            flex: 1,
            minHeight: multiline
                ? inputHeight - Spacing.s * 2
                : inputHeight - Spacing.xs * 2,
            fontSize:
                size === 'small' ? Typography.bodySmall.fontSize : Typography.body.fontSize,
            color: colors.text,
            textAlignVertical: multiline ? 'top' : 'center',
            paddingVertical: 0,
            includeFontPadding: false,
        },
        iconContainer: {
            paddingLeft: Spacing.s,
            paddingTop: multiline ? Spacing.xs : 0,
        },
        inputError: {
            borderColor: colors.danger,
            borderWidth: 1.5,
        },
        errorText: {
            color: colors.danger,
            fontSize: Typography.caption.fontSize,
            marginTop: Spacing.xs,
            marginLeft: Spacing.xs,
        },
    });
