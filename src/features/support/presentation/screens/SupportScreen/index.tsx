import React, { useMemo, useState } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    Alert,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { Spacing, ComponentSizes } from '../../../../../shared/theme/theme';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import ResponsiveText from '../../../../../shared/components/ResponsiveText';
import { getStyles } from './style';

const FAQ_ITEMS = [
    {
        question: 'How do I book a service?',
        answer:
            'Go to the Services tab, select the service you need, choose a time slot, and confirm your booking.',
    },
    {
        question: 'How can I cancel or reschedule a booking?',
        answer:
            'Open My Orders from the Home screen, select the booking, and tap "Cancel" or "Reschedule".',
    },
    {
        question: 'How do I update my profile information?',
        answer:
            'Navigate to Profile from the drawer menu or bottom tab, then tap "Edit Profile" to update your details.',
    },
    {
        question: 'What payment methods are accepted?',
        answer:
            'We accept all major credit/debit cards, UPI, and net banking. Payment options appear at checkout.',
    },
    {
        question: 'How do I reset my password?',
        answer:
            'Go to Settings → Change Password, or use the "Forgot Password" option on the login screen.',
    },
];

const CONTACT_ITEMS = [
    {
        title: 'Email Support',
        subtitle: 'support@example.com',
        icon: 'email-outline',
        color: '#3B82F6',
        onPress: () => Linking.openURL('mailto:support@example.com'),
    },
    {
        title: 'Call Us',
        subtitle: '+1 (800) 123-4567',
        icon: 'phone-outline',
        color: '#22C55E',
        onPress: () => Linking.openURL('tel:+18001234567'),
    },
    {
        title: 'Live Chat',
        subtitle: 'Chat with our support team',
        icon: 'chat-outline',
        color: '#8B5CF6',
        onPress: () => Alert.alert('Live Chat', 'Live chat will be available soon.'),
    },
    {
        title: 'WhatsApp',
        subtitle: 'Message us on WhatsApp',
        icon: 'whatsapp',
        color: '#25D366',
        onPress: () => Linking.openURL('https://wa.me/18001234567'),
    },
];

const RESOURCE_ITEMS = [
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
        title: 'Send Feedback',
        subtitle: 'Help us improve the app',
        icon: 'message-text-outline',
        color: '#F59E0B',
        onPress: () => Linking.openURL('mailto:feedback@example.com?subject=App Feedback'),
    },
];

const SupportScreen = () => {
    const { colors } = useTheme();
    const { isSmallDevice } = useResponsive();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
    const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

    const toggleFaq = (index: number) => {
        setExpandedFaq((prev) => (prev === index ? null : index));
    };

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

    const renderFaqItem = (item: { question: string; answer: string }, index: number) => {
        const isOpen = expandedFaq === index;
        return (
            <View key={index} style={styles.faqItem}>
                <TouchableOpacity
                    style={styles.faqHeader}
                    onPress={() => toggleFaq(index)}
                    activeOpacity={0.7}
                >
                    <ResponsiveText variant="body" style={styles.faqQuestion}>
                        {item.question}
                    </ResponsiveText>
                    <Icon
                        name={isOpen ? 'chevron-up' : 'chevron-down'}
                        size={20}
                        color={colors.textSecondary}
                    />
                </TouchableOpacity>
                {isOpen && (
                    <>
                        <View style={styles.divider} />
                        <ResponsiveText variant="bodySmall" style={styles.faqAnswer}>
                            {item.answer}
                        </ResponsiveText>
                    </>
                )}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

            <CommonHeader
                title="Help & Support"
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
                    <View style={styles.heroIcon}>
                        <Icon name="headset" size={ComponentSizes.icon.large} color={colors.primary} />
                    </View>
                    <ResponsiveText variant="h3" style={styles.heroTitle}>
                        How can we help?
                    </ResponsiveText>
                    <ResponsiveText variant="bodySmall" style={styles.heroSubtitle}>
                        We're here 24/7 to assist you
                    </ResponsiveText>
                </View>

                {/* Contact Options */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Contact Us
                    </ResponsiveText>
                    {CONTACT_ITEMS.map(renderMenuItem)}
                </View>

                {/* FAQ */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Frequently Asked Questions
                    </ResponsiveText>
                    {FAQ_ITEMS.map(renderFaqItem)}
                </View>

                {/* Resources */}
                <View style={styles.menuSection}>
                    <ResponsiveText variant="h4" style={styles.sectionTitle}>
                        Resources
                    </ResponsiveText>
                    {RESOURCE_ITEMS.map(renderMenuItem)}
                </View>
            </ScrollView>
        </View>
    );
};

export default SupportScreen;
