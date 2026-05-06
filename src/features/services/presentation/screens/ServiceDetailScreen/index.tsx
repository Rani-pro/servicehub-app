import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialIcon as any;
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../../navigation/navigationTypes';
import { ServicesRepository } from '../../../data/ServicesRepository';
import { Service } from '../../../data/models/Service';
import { styles } from './style';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { Colors } from '../../../../../shared/theme/theme';
import { BookingRepository } from '../../../../bookings/data/BookingRepository';

type DetailRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;
type DetailNavProp = NativeStackNavigationProp<RootStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation<DetailNavProp>();
    const { serviceId } = route.params;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);

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
                <ActivityIndicator size="large" color={Colors.primary} />
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
        <SafeAreaView style={styles.container}>
            <CommonHeader
                title={service.name}
                leftElement="back"
                rightElement="none"
                backgroundColor="primary"
            />

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.imagePlaceholder}>
                    <Icon name={service.icon} size={100} color={Colors.primary} />
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default ServiceDetailScreen;
