import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../../../../navigation/navigationTypes';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { ServiceModel } from '../../../../../shared/schema';
import { Spacing } from '../../../../../shared/theme/theme';
import { BookingRepository } from '../../../../bookings/data/BookingRepository';
import { ServicesRepository } from '../../../data/ServicesRepository';
import { getStyles } from './style';
const Icon = MaterialIcon as any;

type DetailRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;
type DetailNavProp = NativeStackNavigationProp<RootStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation<DetailNavProp>();
    const { serviceId } = route.params;
    const [service, setService] = useState<ServiceModel | null>(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const { isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const styles = useMemo(
        () => getStyles(isLandscape, colors),
        [isLandscape, screenWidth, colors],
    );

    React.useEffect(() => {
        loadService();
    }, [serviceId]);

    const loadService = async () => {
        try {
            const data = await ServicesRepository.getInstance().getServiceById(serviceId);
            if (data) setService(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleBookNow = async () => {
        if (!service) return;
        setBooking(true);
        try {
            const result = await BookingRepository.getInstance().createBooking({
                serviceId: service.id,
                serviceName: service.name,
            });

            navigation.replace('BookingConfirmation', {
                bookingId: result.bookingId,
                serviceName: result.serviceName,
                status: result.status,
                message: result.message,
            });
        } catch (error: any) {
            Alert.alert('Booking Failed', error?.message ?? 'Something went wrong. Please try again.');
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    if (!service) {
        return (
            <View style={styles.errorContainer}>
                <Text>Service not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CommonHeader
                title={service.name}
                leftElement="back"
                rightElement="none"
                backgroundColor="primary"
            />

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    {
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                        paddingBottom: Math.max(Spacing.xl, insets.bottom + Spacing.m),
                    },
                ]}
            >
                {/* In landscape: side-by-side layout */}
                <View style={styles.mainContent}>
                    <View style={styles.imagePlaceholder}>
                        <Icon name={service.icon} size={isLandscape ? 60 : 100} color={colors.primary} />
                    </View>

                    <View style={styles.contentContainer}>
                        <Text style={styles.category}>{service.category}</Text>
                        <Text style={styles.name}>{service.name}</Text>
                        <Text style={styles.price}>{service.price}</Text>

                        <View style={styles.divider} />

                        <Text style={styles.sectionTitle}>Description</Text>
                        <Text style={styles.description}>{service.description}</Text>

                        <TouchableOpacity
                            style={[styles.bookButton, booking && { opacity: 0.6 }]}
                            activeOpacity={0.8}
                            onPress={handleBookNow}
                            disabled={booking}
                        >
                            {booking
                                ? <ActivityIndicator color="#fff" />
                                : <Text style={styles.bookButtonText}>Book Now</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ServiceDetailScreen;
