import { StyleSheet } from 'react-native';
import { Spacing, ComponentSizes, Typography, Shadows } from '../../../../shared/theme/theme';

export const getStyles = (colors: any) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.secondaryBackground, // A slightly darker background looks better for cards
        },
        keyboardView: {
            flex: 1,
        },
        scrollContent: {
            padding: Spacing.m,
            paddingBottom: Spacing.xl,
        },
        section: {
            marginBottom: Spacing.m,
            backgroundColor: colors.background, // white in light mode
            padding: Spacing.m,
            borderRadius: ComponentSizes.card.borderRadius,
            ...Shadows.small,
        },
        sectionTitle: {
            ...Typography.h4,
            color: colors.text,
            marginBottom: Spacing.s,
        },
        ratingContainer: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: Spacing.s,
            gap: Spacing.s,
        },
        categoriesContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: Spacing.s,
            marginTop: Spacing.xs,
        },
        categoryChip: {
            paddingHorizontal: Spacing.m,
            paddingVertical: Spacing.s,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.background,
        },
        categoryChipSelected: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        categoryText: {
            ...Typography.bodySmall,
            color: colors.textSecondary,
            fontWeight: '500',
        },
        categoryTextSelected: {
            color: '#FFFFFF',
            fontWeight: '600',
        },
        input: {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: ComponentSizes.input.borderRadius,
            padding: Spacing.m,
            color: colors.text,
            backgroundColor: colors.background,
            ...Typography.body,
        },
        textArea: {
            minHeight: 120,
            textAlignVertical: 'top',
        },
        uploadButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: Spacing.m,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.primary,
            borderRadius: ComponentSizes.button.borderRadius,
            backgroundColor: colors.primary + '10',
            gap: Spacing.s,
        },
        uploadText: {
            ...Typography.button,
            color: colors.primary,
        },
        imagePreviewContainer: {
            marginTop: Spacing.xs,
            position: 'relative',
        },
        imagePreview: {
            width: '100%',
            height: 200,
            borderRadius: ComponentSizes.card.borderRadius,
        },
        removeImageButton: {
            position: 'absolute',
            top: Spacing.s,
            right: Spacing.s,
            backgroundColor: 'rgba(0,0,0,0.6)',
            borderRadius: 20,
            padding: 4,
        },
        submitButton: {
            backgroundColor: colors.primary,
            padding: Spacing.m,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: Spacing.l,
            marginBottom: Spacing.xl,
        },
        submitButtonDisabled: {
            opacity: 0.6,
        },
        submitButtonText: {
            ...Typography.button,
            color: '#FFFFFF',
        },
        errorText: {
            ...Typography.caption,
            color: colors.danger,
            marginTop: Spacing.xs,
            marginLeft: Spacing.xs,
        },
        label: {
            ...Typography.body,
            color: colors.text,
            marginBottom: Spacing.s,
            fontWeight: '600',
        },
        requiredStar: {
            color: colors.danger,
        }
    });
};
