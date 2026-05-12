import React, { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity, Linking, StatusBar } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { Spacing, ComponentSizes } from '../../../../../shared/theme/theme';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { getStyles } from './style';

const APP_VERSION = '1.0.0';
const BUILD_NUMBER = '100';

const STATS = [
    { value: '10K+', label: 'Users' },
    { value: '500+', label: 'Services' },
    { value: '4.8★', label: 'Rating' },
];

const LEGAL_ITEMS = [
    {
        title: 'Privacy Policy',
        subtitle: 'How we handle your data',
        icon: 'shield-outline',
        color: '#8B5CF6',
        onPress: () => Linking.openURL('https://example.com/privacy'),
    },
    {
        title: 'Terms of Service',
        subtitle: 'Our terms and conditions',
        icon: 'file-document-outline',
        color: '#06B6D4',
        onPress: () => Linking.openURL('https://example.com/terms'),
    },
    {
        title: 'Open Source Licenses',
        subtitle: 'Third-party libraries we use',
        icon: 'code-tags',
        color: '#F59E0B',
        onPress: () => Linking.openURL('https://example.com/licenses'),
    },
];

const SOCIAL_ITEMS = [
    {
        title: 'Website',
        subtitle: 'www.example.com',
        icon: 'web',
        color: '#3B82F6',
        onPress: () => Linking.openURL('https://example.com'),
    },
    {
        title: 'Twitter / X',
        subtitle: '@example',
        icon: 'twitter',
        color: '#1DA1F2',
        onPress: () => Linking.openURL('https://twitter.com/example'),
    },
    {
        title: 'Instagram',
        subtitle: '@example',
        icon: 'instagram',
        color: '#E1306C',
        onPress: () => Linking.openURL('https://instagram.com/example'),
    },
];

const AboutScreen = () => {
    const { colors } = useTheme();
    const { isSmallDevice } = useResponsive();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);

    const renderMenuItem = (
        item: { title: string; subtitle: string; icon: string; color: string; onPress: () => void },
        index: number
    ) => (
        <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.menuIcon, { backgroundColor: item.color + '15' }]}>
                <Icon name={item.icon} size={isSmallDevice ? 20 : 24} color={item.color} />
            </View>
            <View style={styles.menuContent}>
                <ResponsiveText variant={isSmallDevice ? 'body' : 'h4'} style={styles.menuText}>
                    {item.title}
                </ResponsiveText>
                <ResponsiveText variant="bodySmall" style={styles.menuSubtext}>
                    {item.subtitle}
                </ResponsiveText>
            </View>
            <Icon name="chevron-right" size={20} color={colors.textSecondary} style={styles.chevron} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            <CommonHeader
                title="About"
                leftElement="back"
                rightElement="none"
            />

            <ScrollView
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: Spacing.xl }}
            >
                {/* Hero */}
                <View style={styles.heroCard}>
                    <View style={styles.appIcon}>
                        <Icon name="lightning-bolt" size={ComponentSizes.icon.large} color={colors.primary} />
                    </View>
                    <ResponsiveText variant="h3" style={styles.appName}>
                        ServiceHub
                    </ResponsiveText>
                    <ResponsiveText variant="bodySmall" style={styles.appVersion}>
                        Version {APP_VERSION} (Build {BUILD_NUMBER})
                    </ResponsiveText>
                    <ResponsiveText variant="bodySmall" style={styles.appTagline}>
                        Your trusted service partner
                    </ResponsiveText>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    {STATS.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <ResponsiveText variant="h3" style={styles.statValue}>
                                {stat.value}
                            </ResponsiveText>
                            <ResponsiveText variant="bodySmall" style={styles.statLabel}>
                                {stat.label}
                            </ResponsiveText>
                        </View>
                    ))}
                </View>

                {/* About */}
                <View style={styles.section}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        About Us
                    </ResponsiveText>
                    <View style={styles.descriptionCard}>
                        <ResponsiveText variant="body" style={styles.descriptionText}>
                            We connect you with trusted professionals for all your home and personal service needs.
                            From cleaning to repairs, our platform makes booking fast, easy, and reliable.
                        </ResponsiveText>
                    </View>
                </View>

                {/* Legal */}
                <View style={styles.section}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Legal
                    </ResponsiveText>
                    {LEGAL_ITEMS.map(renderMenuItem)}
                </View>

                {/* Social */}
                <View style={styles.section}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Follow Us
                    </ResponsiveText>
                    {SOCIAL_ITEMS.map(renderMenuItem)}
                </View>

                {/* Copyright */}
                <ResponsiveText variant="bodySmall" style={styles.copyrightText}>
                    © {new Date().getFullYear()} MyApp. All rights reserved.
                </ResponsiveText>
            </ScrollView>
        </View>
    );
};

export default AboutScreen;
