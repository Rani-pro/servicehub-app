import { StyleSheet } from 'react-native';
import { Spacing, Typography, ComponentSizes, Shadows } from '../../../../../shared/theme/theme';
import { responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (Colors: any, SpacingParam?: any) => {
    const S = SpacingParam || Spacing;
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: S.m,
            backgroundColor: Colors.white,
            ...Shadows.small,
        },
        menuButton: {
            padding: S.xs,
        },
        headerTitle: {
            ...Typography.h4,
            color: Colors.primary,
            flex: 1,
            textAlign: 'center',
        },
        placeholder: {
            width: 40,
        },
        listContent: {
            padding: S.s,
            paddingBottom: S.m,
        },
        emptyListContent: {
            flexGrow: 1,
            padding: S.s,
        },
        serviceCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: ComponentSizes.card.borderRadius,
            padding: S.m,
            marginBottom: S.m,
            ...Shadows.small,
        },
        iconContainer: {
            width: responsiveScale(56),
            height: responsiveScale(56),
            borderRadius: responsiveScale(28),
            backgroundColor: Colors.primary + '15',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: S.m,
        },
        textContainer: {
            flex: 1,
        },
        nameRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: S.xs,
        },
        serviceName: {
            ...Typography.body,
            fontWeight: 'bold',
            color: Colors.text,
            flex: 1,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.warning + '25',
            paddingHorizontal: S.s,
            paddingVertical: 2,
            borderRadius: 4,
            marginLeft: S.s,
        },
        ratingText: {
            ...Typography.caption,
            fontWeight: '600',
            color: Colors.warning,
            marginLeft: 2,
        },
        serviceDescription: {
            ...Typography.bodySmall,
            color: Colors.textSecondary,
            marginBottom: S.s,
        },
        bottomRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        servicePrice: {
            ...Typography.body,
            fontWeight: '700',
            color: Colors.primary,
        },
        badge: {
            paddingHorizontal: S.s,
            paddingVertical: 4,
            borderRadius: 6,
        },
        availableBadge: {
            backgroundColor: Colors.success + '20',
        },
        unavailableBadge: {
            backgroundColor: Colors.danger + '20',
        },
        badgeText: {
            ...Typography.caption,
            fontWeight: '600',
        },
        availableText: {
            color: Colors.success,
        },
        unavailableText: {
            color: Colors.danger,
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            ...Typography.body,
            marginTop: S.m,
            color: Colors.textSecondary,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: S.xl,
        },
        emptyTitle: {
            ...Typography.h4,
            color: Colors.text,
            marginTop: S.m,
            marginBottom: S.s,
        },
        emptyDescription: {
            ...Typography.bodySmall,
            color: Colors.textSecondary,
            textAlign: 'center',
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: S.xl,
        },
        errorTitle: {
            ...Typography.h4,
            color: Colors.text,
            marginTop: S.m,
            marginBottom: S.s,
        },
        errorDescription: {
            ...Typography.bodySmall,
            color: Colors.textSecondary,
            textAlign: 'center',
            marginBottom: S.l,
        },
    });
};
