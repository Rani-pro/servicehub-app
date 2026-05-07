import { StyleSheet } from 'react-native';
import { ComponentSizes, Shadows } from '../../../../../shared/theme/theme';
import { responsiveWidth, getSpacing, responsiveScale } from '../../../../../shared/utils/responsive';

export const getStyles = (Colors: any, Spacing: any) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.m,
        paddingVertical: Spacing.m,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        ...Shadows.small,
    },
    menuButton: {
        padding: Spacing.xs,
        borderRadius: ComponentSizes.button.borderRadius,
        backgroundColor: Colors.secondaryBackground,
    },
    headerContent: {
        flex: 1,
        marginLeft: Spacing.m,
    },
    nameText: {
        marginTop: Spacing.xs / 2,
        fontWeight: '600',
    },
    notificationButton: {
        padding: Spacing.xs,
        borderRadius: ComponentSizes.button.borderRadius,
        backgroundColor: Colors.secondaryBackground,
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.danger,
    },
    scrollContent: {
        paddingHorizontal: responsiveWidth(4),
        paddingVertical: Spacing.xs / 2,
        flexGrow: 1,
    },
    quickActionsContainer: {
        marginBottom: Spacing.m,
    },
    sectionTitle: {
        marginBottom: Spacing.m,
        fontWeight: '600',
    },
    quickActionsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.m,
    },
    quickActionCard: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.m,
        paddingHorizontal: Spacing.s,
        borderRadius: ComponentSizes.card.borderRadius,
        ...Shadows.medium,
        gap: Spacing.s,
    },
    quickActionText: {
        fontWeight: '600',
    },
    statsContainer: {
        marginBottom: Spacing.xl,
    },
    statsCard: {
        backgroundColor: Colors.white,
    },
    statsContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: Colors.border,
        marginHorizontal: Spacing.m,
    },
    menuSection: {
        marginBottom: Spacing.m,
    },
    cardContent: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: getSpacing(50),
        paddingVertical: Spacing.xs/2,
    },
    iconContainer: {
        width: responsiveScale(60),
        height: responsiveScale(60),
        borderRadius: responsiveScale(30),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Spacing.s,
    },
    cardTitle: {
        textAlign: 'center',
        fontWeight: '500',
        marginTop: Spacing.xs,
    },
});