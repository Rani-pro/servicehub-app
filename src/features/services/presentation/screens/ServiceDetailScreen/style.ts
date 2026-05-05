import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.m,
        backgroundColor: Colors.primary,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    backButton: {
        marginRight: Spacing.m,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.white,
    },
    scrollContent: {
        flexGrow: 1,
    },
    imagePlaceholder: {
        height: 200,
        backgroundColor: Colors.secondaryBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        padding: Spacing.l,
    },
    category: {
        fontSize: 14,
        color: Colors.primary,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: Spacing.s,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.s,
    },
    price: {
        fontSize: 22,
        fontWeight: '600',
        color: Colors.success,
        marginBottom: Spacing.m,
    },
    divider: {
        height: 1,
        backgroundColor: '#E1E1E1',
        marginVertical: Spacing.l,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
        marginBottom: Spacing.m,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: Colors.textSecondary,
        marginBottom: Spacing.xl,
    },
    bookButton: {
        backgroundColor: Colors.primary,
        padding: Spacing.m,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    bookButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
