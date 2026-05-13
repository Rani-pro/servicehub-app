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
        },
        scrollContent: {
            padding: Spacing.m,
            paddingBottom: Spacing.xl,
        },
        avatarSection: {
            alignItems: 'center',
            marginBottom: Spacing.l,
        },
        avatarWrapper: {
            position: 'relative',
            marginBottom: Spacing.s,
        },
        avatar: {
            width: responsiveScale(90),
            height: responsiveScale(90),
            borderRadius: responsiveScale(45),
            backgroundColor: colors.primary + '20',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
        },
        avatarImage: {
            width: responsiveScale(90),
            height: responsiveScale(90),
            borderRadius: responsiveScale(45),
        },
        editAvatarBtn: {
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: responsiveScale(28),
            height: responsiveScale(28),
            borderRadius: responsiveScale(14),
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            ...Shadows.small,
        },
        avatarHint: {
            ...Typography.caption,
            color: colors.textSecondary,
        },
        formCard: {
            backgroundColor: colors.secondaryBackground,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: Spacing.m,
            marginBottom: Spacing.m,
            ...Shadows.small,
        },
        sectionTitle: {
            ...Typography.body,
            fontWeight: '600',
            color: colors.text,
            marginBottom: Spacing.m,
        },
        saveBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: Spacing.m,
            marginTop: Spacing.m,
            marginBottom: Spacing.m,
            ...Shadows.medium,
        },
        saveBtnText: {
            ...Typography.body,
            color: '#FFFFFF',
            fontWeight: '700',
            fontSize: responsiveScale(16),
            marginRight: responsiveScale(8),
        },
        phoneLabel: {
            color: colors.text,
            fontWeight: '500',
            marginBottom: Spacing.xs,
        },
        phoneRow: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing.s,
        },
        countryCodeBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: responsiveScale(4),
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: responsiveScale(8),
            paddingHorizontal: Spacing.s,
            height: responsiveScale(48),
            minWidth: responsiveScale(90),
        },
        flagText: {
            fontSize: responsiveScale(20),
        },
        dialText: {
            color: colors.text,
            fontWeight: '500',
        },
        phoneInputWrapper: {
            flex: 1,
            backgroundColor: colors.background,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: responsiveScale(8),
            height: responsiveScale(48),
            justifyContent: 'center',
            paddingHorizontal: Spacing.s,
        },
        phoneInput: {
            ...Typography.body,
            color: colors.text,
        },
        // Modal
        modalOverlay: {
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.45)',
            justifyContent: 'flex-end',
        },
        modalSheet: {
            backgroundColor: colors.secondaryBackground,
            borderTopLeftRadius: responsiveScale(20),
            borderTopRightRadius: responsiveScale(20),
            paddingTop: Spacing.m,
            paddingHorizontal: Spacing.m,
            maxHeight: '75%',
            paddingBottom: 0,
        },
        modalHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: Spacing.m,
        },
        modalTitle: {
            color: colors.text,
            fontWeight: '600',
        },
        searchBox: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.background,
            borderRadius: responsiveScale(8),
            paddingHorizontal: Spacing.s,
            marginBottom: Spacing.s,
            gap: Spacing.xs,
            height: responsiveScale(44),
        },
        searchInput: {
            flex: 1,
            ...Typography.bodySmall,
            color: colors.text,
        },
        countryItem: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: Spacing.s,
            paddingHorizontal: Spacing.xs,
            borderRadius: responsiveScale(8),
            gap: Spacing.s,
        },
        countryItemActive: {
            backgroundColor: colors.primary + '18',
        },
        itemFlag: {
            fontSize: responsiveScale(22),
        },
        itemName: {
            flex: 1,
            color: colors.text,
        },
        itemDial: {
            color: colors.textSecondary,
        },
        // Photo picker
        photoPickerSheet: {
            backgroundColor: colors.secondaryBackground,
            borderTopLeftRadius: responsiveScale(20),
            borderTopRightRadius: responsiveScale(20),
            paddingTop: Spacing.m,
            paddingHorizontal: Spacing.m,

        },
        photoOption: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: Spacing.m,
            paddingVertical: Spacing.m,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        photoOptionText: {
            ...Typography.body,
            color: colors.text,
        },
        photoCancelBtn: {
            alignItems: 'center',
            paddingVertical: Spacing.m,
            marginTop: Spacing.xs,
        },
        photoCancelText: {
            ...Typography.body,
            color: colors.textSecondary,
        },
    });
