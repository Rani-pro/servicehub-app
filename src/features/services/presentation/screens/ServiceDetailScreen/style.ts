import { StyleSheet } from 'react-native';
import { Spacing } from '../../../../../shared/theme/theme';

export const getStyles = (isLandscape: boolean = false, colors?: any) => {
    const c = colors ?? {
        background: '#FFFFFF',
        secondaryBackground: '#F3F4F6',
        white: '#FFFFFF',
        text: '#111827',
        textSecondary: '#4B5563',
        primary: '#22C55E',
        success: '#22C55E',
        border: '#E5E7EB',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: c.background,
        },
        scrollContent: {
            flexGrow: 1,
        },
        // In landscape: row layout (image left, content right)
        mainContent: {
            flexDirection: isLandscape ? 'row' : 'column',
            flex: isLandscape ? 1 : undefined,
        },
        imagePlaceholder: {
            height: isLandscape ? '100%' : 200,
            width: isLandscape ? 180 : undefined,
            backgroundColor: c.secondaryBackground,
            justifyContent: 'center',
            alignItems: 'center',
        },
        contentContainer: {
            padding: isLandscape ? Spacing.m : Spacing.l,
            flex: 1,
        },
        category: {
            fontSize: isLandscape ? 12 : 14,
            color: c.primary,
            fontWeight: 'bold',
            textTransform: 'uppercase',
            marginBottom: Spacing.s,
        },
        name: {
            fontSize: isLandscape ? 20 : 28,
            fontWeight: 'bold',
            color: c.text,
            marginBottom: Spacing.s,
        },
        price: {
            fontSize: isLandscape ? 17 : 22,
            fontWeight: '600',
            color: c.success,
            marginBottom: Spacing.m,
        },
        divider: {
            height: 1,
            backgroundColor: c.border,
            marginVertical: isLandscape ? Spacing.s : Spacing.l,
        },
        sectionTitle: {
            fontSize: isLandscape ? 15 : 18,
            fontWeight: 'bold',
            color: c.text,
            marginBottom: Spacing.s,
        },
        description: {
            fontSize: isLandscape ? 13 : 16,
            lineHeight: isLandscape ? 20 : 24,
            color: c.textSecondary,
            marginBottom: Spacing.l,
        },
        bookButton: {
            backgroundColor: c.primary,
            padding: Spacing.m,
            borderRadius: 12,
            alignItems: 'center',
        },
        bookButtonText: {
            color: '#FFFFFF',
            fontSize: isLandscape ? 15 : 18,
            fontWeight: 'bold',
        },
        loadingContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: c.background,
        },
        errorContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });
};
