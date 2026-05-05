import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import {
    Layout,
    Card,
    Grid,
    Button,
    Input,
    ResponsiveText,
    useResponsive,
    useResponsiveValue,
} from './index';
import { Spacing } from '../theme/theme';
import { useTheme } from '../hooks/useTheme';

const ResponsiveDemo: React.FC = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const { colors } = useTheme();
    const { screenSize, isTablet, gridColumns, breakpoint } = useResponsive();

    // Example of responsive values
    const cardPadding = useResponsiveValue({
        small: 'small' as const,
        medium: 'medium' as const,
        large: 'large' as const,
        tablet: 'large' as const,
        default: 'medium' as const,
    });

    const buttonSize = useResponsiveValue({
        small: 'small' as const,
        medium: 'medium' as const,
        large: 'large' as const,
        default: 'medium' as const,
    });

    const demoCards = [
        { title: 'Profile', icon: '👤', color: colors.primary },
        { title: 'Settings', icon: '⚙️', color: colors.secondary },
        { title: 'Messages', icon: '💬', color: colors.success },
        { title: 'Help', icon: '❓', color: colors.danger },
        { title: 'About', icon: 'ℹ️', color: colors.primary },
        { title: 'Feedback', icon: '📝', color: colors.secondary },
    ];

    return (
        <Layout scrollable safeArea padding="medium">
            {/* Header */}
            <Card padding={cardPadding} style={{ marginBottom: Spacing.l }}>
                <ResponsiveText variant="h2" align="center" style={{ marginBottom: Spacing.s }}>
                    Responsive Demo
                </ResponsiveText>
                <ResponsiveText variant="body" align="center" color={colors.textSecondary}>
                    This screen demonstrates responsive design across all device sizes
                </ResponsiveText>
            </Card>

            {/* Device Info */}
            <Card padding="medium" style={{ marginBottom: Spacing.l }}>
                <ResponsiveText variant="h3" style={{ marginBottom: Spacing.m }}>
                    Device Information
                </ResponsiveText>
                <ResponsiveText variant="body" style={{ marginBottom: Spacing.xs }}>
                    Screen Size: {screenSize}
                </ResponsiveText>
                <ResponsiveText variant="body" style={{ marginBottom: Spacing.xs }}>
                    Is Tablet: {isTablet ? 'Yes' : 'No'}
                </ResponsiveText>
                <ResponsiveText variant="body" style={{ marginBottom: Spacing.xs }}>
                    Grid Columns: {gridColumns}
                </ResponsiveText>
                <ResponsiveText variant="body">
                    Breakpoint: {breakpoint}
                </ResponsiveText>
            </Card>

            {/* Form Example */}
            <Card padding={cardPadding} style={{ marginBottom: Spacing.l }}>
                <ResponsiveText variant="h3" style={{ marginBottom: Spacing.m }}>
                    Responsive Form
                </ResponsiveText>
                
                <Input
                    label="Email Address"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                />

                <Input
                    label="Message"
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Enter your message"
                    multiline
                    numberOfLines={4}
                />

                <View style={{ 
                    flexDirection: isTablet ? 'row' : 'column',
                    gap: Spacing.s,
                    marginTop: Spacing.m 
                }}>
                    <Button
                        title="Submit"
                        onPress={() => Alert.alert('Success', 'Form submitted!')}
                        size={buttonSize as any}
                        style={{ flex: isTablet ? 1 : undefined }}
                    />
                    <Button
                        title="Cancel"
                        onPress={() => {
                            setEmail('');
                            setMessage('');
                        }}
                        variant="outline"
                        size={buttonSize as any}
                        style={{ flex: isTablet ? 1 : undefined }}
                    />
                </View>
            </Card>

            {/* Grid Example */}
            <Card padding="small" style={{ marginBottom: Spacing.l }}>
                <ResponsiveText variant="h3" style={{ marginBottom: Spacing.m, paddingHorizontal: Spacing.m }}>
                    Responsive Grid ({gridColumns} columns)
                </ResponsiveText>
                
                <Grid spacing={Spacing.s}>
                    {demoCards.map((card, index) => (
                        <Card key={index} padding="medium" shadow="small" fullWidth={false}>
                            <View style={{ alignItems: 'center' }}>
                                <ResponsiveText variant="h1" style={{ marginBottom: Spacing.xs }}>
                                    {card.icon}
                                </ResponsiveText>
                                <ResponsiveText variant="bodySmall" align="center">
                                    {card.title}
                                </ResponsiveText>
                            </View>
                        </Card>
                    ))}
                </Grid>
            </Card>

            {/* Typography Example */}
            <Card padding={cardPadding}>
                <ResponsiveText variant="h3" style={{ marginBottom: Spacing.m }}>
                    Typography Scale
                </ResponsiveText>
                
                <ResponsiveText variant="h1" style={{ marginBottom: Spacing.xs }}>
                    Heading 1
                </ResponsiveText>
                <ResponsiveText variant="h2" style={{ marginBottom: Spacing.xs }}>
                    Heading 2
                </ResponsiveText>
                <ResponsiveText variant="h3" style={{ marginBottom: Spacing.xs }}>
                    Heading 3
                </ResponsiveText>
                <ResponsiveText variant="h4" style={{ marginBottom: Spacing.xs }}>
                    Heading 4
                </ResponsiveText>
                <ResponsiveText variant="body" style={{ marginBottom: Spacing.xs }}>
                    Body text - This is the standard body text that adapts to different screen sizes.
                </ResponsiveText>
                <ResponsiveText variant="bodySmall" style={{ marginBottom: Spacing.xs }}>
                    Small body text - Used for secondary information.
                </ResponsiveText>
                <ResponsiveText variant="caption">
                    Caption text - The smallest text size for labels and captions.
                </ResponsiveText>
            </Card>
        </Layout>
    );
};

export default ResponsiveDemo;