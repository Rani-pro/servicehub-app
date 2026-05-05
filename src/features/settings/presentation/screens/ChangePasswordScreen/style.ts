import { StyleSheet } from 'react-native';
import { Colors, Spacing } from '../../../../../shared/theme/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: Spacing.m,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: Spacing.s,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        marginLeft: Spacing.s,
    },
    content: {
        padding: Spacing.m,
    },
    infoCard: {
        backgroundColor: '#F0FDF4',
        padding: Spacing.m,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: Spacing.l,
        borderWidth: 1,
        borderColor: '#DCFCE7',
    },
    infoText: {
        color: '#166534',
        textAlign: 'center',
        marginTop: Spacing.s,
        lineHeight: 20,
    },
    form: {
        backgroundColor: Colors.white,
        padding: Spacing.m,
        borderRadius: 16,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
    },
    submitButton: {
        marginTop: Spacing.m,
    },
});
