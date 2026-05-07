import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ApiError } from '../../../../../core/api/apiErrorHandler';
import { BottomTabParamList, DrawerParamList } from '../../../../../navigation/navigationTypes';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { ServiceModel } from '../../../../../shared/schema';
import { Spacing } from '../../../../../shared/theme/theme';
import { ServicesRepository } from '../../../data/ServicesRepository';
import { getStyles } from './style';
const Icon = MaterialIcon as any;

type NavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<BottomTabParamList, 'Services'>,
    DrawerNavigationProp<DrawerParamList>
>;

const ServicesListScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { colors } = useTheme();
    const { isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();

    const styles = useMemo(
        () => getStyles(colors, Spacing, isLandscape),
        [colors, isLandscape, screenWidth],
    );

    const [services, setServices] = useState<ServiceModel[]>([]);
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

    const renderServiceItem = ({ item }: { item: ServiceModel }) => (
        <TouchableOpacity
            style={styles.serviceCard}
            onPress={() => navigation.navigate('ServiceDetail' as any, { serviceId: item.id, title: item.name })}
            activeOpacity={0.7}
        >
            <View style={styles.iconContainer}>
                <Icon name={item.icon} size={isLandscape ? 24 : 32} color={colors.primary} />
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
                <Text style={styles.serviceDescription} numberOfLines={isLandscape ? 1 : 2}>
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
            <TouchableOpacity style={styles.retryButton} onPress={() => loadServices()}>
                <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
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
                        {
                            paddingLeft: Math.max(Spacing.m, insets.left + Spacing.s),
                            paddingRight: Math.max(Spacing.m, insets.right + Spacing.s),
                            paddingBottom: Math.max(Spacing.xs, insets.bottom + Spacing.xs),
                        },
                    ]}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={renderEmptyState}
                    // Landscape mein 2 columns use karo
                    numColumns={isLandscape ? 2 : 1}
                    key={isLandscape ? 'landscape' : 'portrait'} // Force re-render on orientation change
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
        </View>
    );
};

export default ServicesListScreen;
