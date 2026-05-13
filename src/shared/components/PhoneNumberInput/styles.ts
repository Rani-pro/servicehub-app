import { StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, Typography, ComponentSizes, Shadows } from '../../theme/theme';

export const styles = StyleSheet.create({
    container: {
        marginBottom: Spacing.m,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: ComponentSizes.input.borderRadius,
        backgroundColor: Colors.white,
        height: ComponentSizes.input.height,
        overflow: 'hidden',
    },
    inputContainerError: {
        borderColor: Colors.error,
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Spacing.m,
        height: '100%',
        borderRightWidth: 1,
        borderRightColor: Colors.border,
        backgroundColor: Colors.secondaryBackground,
    },
    flagText: {
        fontSize: 20,
        marginRight: Spacing.s,
        ...Platform.select({
            android: {
                fontFamily: 'emoji',
            },
        }),
    },
    dialCodeText: {
        ...Typography.body,
        color: Colors.text,
        fontWeight: '500',
    },
    dropdownIcon: {
        marginLeft: Spacing.xs,
    },
    textInput: {
        flex: 1,
        height: '100%',
        paddingHorizontal: Spacing.m,
        ...Typography.body,
        color: Colors.text,
    },
    errorText: {
        ...Typography.caption,
        color: Colors.error,
        marginTop: Spacing.xs,
        marginLeft: Spacing.xs,
    },
    // Modal Styles
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        maxHeight: '80%',
        ...Shadows.large,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    modalTitle: {
        ...Typography.h4,
        color: Colors.text,
    },
    closeButton: {
        padding: Spacing.xs,
    },
    searchContainer: {
        padding: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    searchInput: {
        backgroundColor: Colors.secondaryBackground,
        height: ComponentSizes.input.height,
        borderRadius: ComponentSizes.input.borderRadius,
        paddingHorizontal: Spacing.m,
        ...Typography.body,
        color: Colors.text,
    },
    listContainer: {
        paddingBottom: Spacing.xl, // Safe area padding essentially
    },
    countryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.m,
        paddingHorizontal: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    selectedCountryItem: {
        backgroundColor: Colors.primary + '10', // 10% opacity
    },
    countryFlag: {
        fontSize: 24,
        marginRight: Spacing.m,
        ...Platform.select({
            android: {
                fontFamily: 'emoji',
            },
        }),
    },
    countryName: {
        flex: 1,
        ...Typography.body,
        color: Colors.text,
    },
    countryDialCode: {
        ...Typography.body,
        color: Colors.textSecondary,
        marginLeft: Spacing.s,
    },
});
