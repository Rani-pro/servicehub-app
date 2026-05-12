import React from 'react';
import { View, ScrollView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Spacing } from '../../theme/theme';
import { useTheme } from '../../hooks/useTheme';
import { getStyles } from './style';

interface LayoutProps {
    children: React.ReactNode;
    style?: ViewStyle;
    padding?: 'none' | 'small' | 'medium' | 'large';
    scrollable?: boolean;
    safeArea?: boolean;
    backgroundColor?: string;
    showsVerticalScrollIndicator?: boolean;
}

const Layout: React.FC<LayoutProps> = ({
    children,
    style,
    padding = 'medium',
    scrollable = false,
    safeArea = true,
    backgroundColor,
    showsVerticalScrollIndicator = false,
}) => {
    const { colors } = useTheme();

    const getPadding = () => {
        switch (padding) {
            case 'none': return 0;
            case 'small': return Spacing.s;
            case 'large': return Spacing.xl;
            default: return Spacing.m;
        }
    };

    const styles = getStyles(backgroundColor || colors.background, getPadding());
    const Container = safeArea ? SafeAreaView : View;

    if (scrollable) {
        return (
            <Container style={[styles.container, style]}>
                <ScrollView
                    showsVerticalScrollIndicator={showsVerticalScrollIndicator}
                    contentContainerStyle={styles.scrollContent}
                >
                    {children}
                </ScrollView>
            </Container>
        );
    }

    return <Container style={[styles.container, style]}>{children}</Container>;
};

export default Layout;
