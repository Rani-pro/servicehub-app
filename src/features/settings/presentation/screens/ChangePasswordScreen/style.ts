import { StyleSheet } from 'react-native';
import { Spacing } from '../../../../../shared/theme/theme';

export const getStyles = (isLandscape: boolean = false, colors?: any) => {
    const c = colors ?? {
        background: '#FFFFFF',
        white: '#FFFFFF',
        text: '#111827',
        border: '#E5E7EB',
        primary: '#22C55E',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.background,
        },
        content: {
            paddingTop: Spacing.m,
        },
        infoCard: {
            backgroundColor: c.primary + '15',
            padding: isLandscape ? Spacing.s : Spacing.m,
            borderRadius: 12,
            alignItems: 'center',
            flexDirection: isLandscape ? 'row' : 'column',
            marginBottom: isLandscape ? Spacing.m : Spacing.l,
            borderWidth: 1,
            borderColor: c.primary + '30',
        },
        infoText: {
            color: c.primary,
            textAlign: isLandscape ? 'left' : 'center',
            marginTop: isLandscape ? 0 : Spacing.s,
            marginLeft: isLandscape ? Spacing.m : 0,
            lineHeight: 20,
            flex: isLandscape ? 1 : undefined,
        },
        form: {
            backgroundColor: c.white,
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
        // Legacy header styles (kept for safety)
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: Spacing.m,
            borderBottomWidth: 1,
            borderBottomColor: c.border,
        },
        backButton: {
            padding: Spacing.s,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: c.text,
            marginLeft: Spacing.s,
        },
    });
};

// Backward-compat static export
export const styles = getStyles(false);
