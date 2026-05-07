import { StyleSheet } from 'react-native';

export const getStyles = (Colors: any, Spacing: any, isLandscape: boolean = false) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: Colors.background,
        },
        listContent: {
            paddingTop: Spacing.m,
        },
        emptyListContent: {
            flexGrow: 1,
            paddingTop: Spacing.m,
        },
        serviceCard: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: Colors.white,
            borderRadius: 12,
            padding: isLandscape ? Spacing.s : Spacing.m,
            marginBottom: isLandscape ? Spacing.s : Spacing.s,
            // In landscape 2-col mode, take half the parent width minus gap
            flex: isLandscape ? 1 : undefined,
            marginHorizontal: isLandscape ? Spacing.xs : 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
        },
        iconContainer: {
            width: isLandscape ? 42 : 56,
            height: isLandscape ? 42 : 56,
            borderRadius: isLandscape ? 21 : 28,
            backgroundColor: Colors.primary + '15',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: Spacing.m,
        },
        textContainer: {
            flex: 1,
        },
        nameRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 4,
        },
        serviceName: {
            fontSize: isLandscape ? 14 : 16,
            fontWeight: 'bold',
            color: Colors.text,
            flex: 1,
        },
        ratingContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFF9E6',
            paddingHorizontal: 6,
            paddingVertical: 2,
            borderRadius: 4,
            marginLeft: 8,
        },
        ratingText: {
            fontSize: 12,
            fontWeight: '600',
            color: '#FFB800',
            marginLeft: 2,
        },
        serviceDescription: {
            fontSize: isLandscape ? 12 : 14,
            color: Colors.textSecondary,
            marginBottom: 8,
            lineHeight: isLandscape ? 16 : 20,
        },
        bottomRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        servicePrice: {
            fontSize: isLandscape ? 13 : 15,
            fontWeight: '700',
            color: Colors.primary,
        },
        badge: {
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
        },
        availableBadge: {
            backgroundColor: '#E8F5E9',
        },
        unavailableBadge: {
            backgroundColor: '#FFEBEE',
        },
        badgeText: {
            fontSize: 11,
            fontWeight: '600',
        },
        availableText: {
            color: '#2E7D32',
        },
        unavailableText: {
            color: '#C62828',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        loadingText: {
            marginTop: Spacing.m,
            fontSize: 16,
            color: Colors.textSecondary,
        },
        emptyContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: Spacing.xl,
        },
        emptyTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.text,
            marginTop: Spacing.m,
            marginBottom: Spacing.s,
        },
        emptyDescription: {
            fontSize: 14,
            color: Colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: Spacing.xl,
        },
        errorTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            color: Colors.text,
            marginTop: Spacing.m,
            marginBottom: Spacing.s,
        },
        errorDescription: {
            fontSize: 14,
            color: Colors.textSecondary,
            textAlign: 'center',
            lineHeight: 20,
            marginBottom: Spacing.l,
        },
        retryButton: {
            backgroundColor: Colors.primary,
            paddingHorizontal: Spacing.xl,
            paddingVertical: Spacing.m,
            borderRadius: 8,
        },
        retryButtonText: {
            color: Colors.white,
            fontSize: 16,
            fontWeight: '600',
        },
    });
