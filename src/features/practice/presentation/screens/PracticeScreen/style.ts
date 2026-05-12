import { StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { Colors, Spacing, Typography } from '../../../../../shared/theme/theme';

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
        ...Typography.h3,
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
        ...Typography.h4,
        color: Colors.text,
        marginBottom: Spacing.s,
    },
    exampleContainer: {
        backgroundColor: Colors.secondaryBackground,
        padding: Spacing.m,
        borderRadius: 8,
        marginBottom: Spacing.m,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    exampleTitle: {
        ...Typography.body,
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
        ...Typography.bodySmall,
        color: Colors.white,
        fontWeight: '500',
    },
    hiddenText: {
        ...Typography.bodySmall,
        color: Colors.success,
        marginTop: Spacing.s,
        fontStyle: 'italic',
    },
    listItem: {
        ...Typography.bodySmall,
        color: Colors.text,
        marginTop: Spacing.xs,
        paddingLeft: Spacing.s,
    },
});
