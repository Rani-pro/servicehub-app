import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native'; import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialIcon as any;
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { BottomTabParamList, DrawerParamList } from '../../../../../navigation/navigationTypes';
import { ServicesRepository } from '../../../data/ServicesRepository';
import { Service } from '../../../data/models/Service';
import { getStyles } from './style';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { Spacing } from '../../../../../shared/theme/theme';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { ApiError } from '../../../../../core/api/apiErrorHandler';
import Button from '../../../../../shared/components/Button';

type NavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Services'>,
    DrawerNavigationProp<DrawerParamList>
>;

const ServicesListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { colors } = useTheme();
    const styles = useMemo(() => getStyles(colors, Spacing), [colors]);
    const { isLandscape } = useResponsive();
    const insets = useSafeAreaInsets();

    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async (isRefresh = false) => {
        try {
            if (!isRefresh) {
                setLoading(true);
            }
            setError(null);

            const data = await ServicesRepository.getInstance().getServices();
            setServices(data);
        } catch (err) {
            const errorMessage = err instanceof ApiError
                ? err.message
                : 'Failed to load services. Please try again.';
            setError(errorMessage);
            console.error('Error loading services:', err);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        loadServices(true);
    }, []);

    const renderServiceItem = ({ item }: { item: Service }) => (
        <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ServiceDetail' as any, { serviceId: item.id, title: item.name })}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Icon name={item.icon} size={32} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
                <View style={styles.nameRow}>
                    <Text style={styles.serviceName}>{item.name}</Text>
                    {item.rating && (
                        <View style={styles.ratingContainer}>
                            <Icon name="star" size={14} color="#FFB800" />
                            <Text style={styles.ratingText}>{item.rating}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.serviceDescription} numberOfLines={2}>
                    {item.description}
                </Text>
                <View style={styles.bottomRow}>
                    <Text style={styles.servicePrice}>{item.price}</Text>
                    {item.isAvailable !== undefined && (
                        <View style={[styles.badge, item.isAvailable ? styles.availableBadge : styles.unavailableBadge]}>
                            <Text style={[styles.badgeText, item.isAvailable ? styles.availableText : styles.unavailableText]}>
                                {item.isAvailable ? 'Available' : 'Unavailable'}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
            <Icon name="chevron-right" size={24} color={colors.textSecondary} />
        </TouchableOpacity>
    );

    const renderEmptyState = () => (
        <View style={styles.emptyContainer}>
            <Icon name="tools" size={64} color={colors.textSecondary} />
            <Text style={styles.emptyTitle}>No Services Available</Text>
            <Text style={styles.emptyDescription}>
                We couldn't find any services at the moment.
            </Text>
        </View>
    );

    const renderErrorState = () => (
        <View style={styles.errorContainer}>
            <Icon name="alert-circle-outline" size={64} color={colors.danger} />
            <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
            <Text style={styles.errorDescription}>{error}</Text>
            <Button
                title="Retry"
                onPress={() => loadServices()}
                variant="primary"
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
            <CommonHeader
                title="Our Services"
                leftElement="menu"
                rightElement="notification"
            />

            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                    <Text style={styles.loadingText}>Loading services...</Text>
                </View>
            ) : error ? (
                renderErrorState()
            ) : (
                <FlatList
                    data={services}
                    renderItem={renderServiceItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={[
                        services.length === 0 ? styles.emptyListContent : styles.listContent,
                        isLandscape && {
                            paddingLeft: (insets.left || 0) + Spacing.m,
                            paddingRight: (insets.right || 0) + Spacing.m,
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={[colors.primary]}
                            tintColor={colors.primary}
                        />
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default ServicesListScreen;

