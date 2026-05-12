import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows } from '../../../../../shared/theme/theme';
import { responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (Colors: any, Spacing: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContent: {
        paddingTop: Spacing.m,
        paddingBottom: Spacing.m,
        flexGrow: 1,
    },
    quickActionsContainer: {
        marginBottom: Spacing.m,
    },
    sectionTitle: {
        marginBottom: Spacing.s,
        fontWeight: '600',
    },
    quickActionsRow: {
        flexDirection: 'row',
        gap: Spacing.s,
    },
    quickActionCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.m,
        paddingHorizontal: Spacing.xs,
        borderRadius: ComponentSizes.card.borderRadius,
        ...Shadows.medium,
        gap: Spacing.xs,
        minHeight: 52,
    },
    quickActionText: {
        fontWeight: '600',
        flexShrink: 1,
    },
    statsContainer: {
        marginBottom: Spacing.m,
    },
    statsCard: {
        backgroundColor: Colors.white,
    },
    statsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: Spacing.xs,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
        paddingVertical: Spacing.xs,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.border,
        marginHorizontal: Spacing.s,
    },
    menuSection: {
        marginBottom: Spacing.s,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.s,
    },
    iconContainer: {
        width: responsiveScale(52),
        height: responsiveScale(52),
        borderRadius: responsiveScale(26),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.xs,
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: '500',
        marginTop: 2,
    },
});
