import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Colors, Spacing } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
    },
    container: {
        padding: Spacing.m,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.l,
    },
    logoutButton: {
        width: 100,
        height: 40,
    },
    section: {
        marginBottom: Spacing.xl,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.text,
        marginBottom: Spacing.s,
    },
    exampleContainer: {
        backgroundColor: Colors.surface,
        padding: Spacing.m,
        borderRadius: 8,
        marginBottom: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    exampleTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: Spacing.s,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.m,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: Spacing.xs,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '500',
    },
    hiddenText: {
        fontSize: 14,
        color: Colors.success,
        marginTop: Spacing.s,
        fontStyle: 'italic',
    },
    listItem: {
        fontSize: 14,
        color: Colors.text,
        marginTop: Spacing.xs,
        paddingLeft: Spacing.s,
    },
    exampleContainer: {
        backgroundColor: Colors.surface,
        padding: Spacing.m,
        borderRadius: 8,
        marginBottom: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    exampleTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.text,
        marginBottom: Spacing.s,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.s,
        paddingHorizontal: Spacing.m,
        borderRadius: 6,
        alignItems: 'center',
        marginVertical: Spacing.xs,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 14,
        fontWeight: '500',
    },
    hiddenText: {
        fontSize: 14,
        color: Colors.success,
        marginTop: Spacing.s,
        fontStyle: 'italic',
    },
    listItem: {
        fontSize: 14,
        color: Colors.text,
        marginTop: Spacing.xs,
        paddingLeft: Spacing.s,
    },
});
