import { StyleSheet } from 'react-native';
import { Spacing, Shadows, ComponentSizes } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: { flex: 1 },
    listContent: {
        padding: Spacing.m,
        paddingBottom: Spacing.xxl + ComponentSizes.button.height,
    },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80 },
    emptyText: { textAlign: 'center' },
    errorBanner: {
        margin: Spacing.m,
        padding: Spacing.s,
        borderRadius: ComponentSizes.card.borderRadius,
    },
    card: { marginBottom: Spacing.m },
    cardBody: { width: '100%' },
    cardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    cardTitle: { flex: 1, marginRight: Spacing.s },
    cardContent: { marginBottom: Spacing.xs },
    fabContainer: {
        position: 'absolute',
        bottom: Spacing.l,
        left: Spacing.l,
        right: Spacing.l,
        ...Shadows.medium,
    },
    // Overlay — tapping here dismisses keyboard
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    // Sheet — fixed height, does NOT resize when keyboard opens
    modalBox: {
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '85%',
    },
    modalScroll: {
        padding: Spacing.l,
        paddingBottom: Spacing.xxl,
    },
    modalTitle: { marginBottom: Spacing.m },
    contentInput: { marginTop: Spacing.xs },
    modalActions: {
        flexDirection: 'row',
        gap: Spacing.m,
        marginTop: Spacing.m,
    },
    modalBtn: { flex: 1 },
});
