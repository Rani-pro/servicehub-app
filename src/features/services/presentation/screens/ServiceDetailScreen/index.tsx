import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialIcon as any;
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../navigation/navigationTypes';
import { ServicesRepository } from '../../../data/ServicesRepository';
import { Service } from '../../../data/models/Service';
import { styles } from './style';
import { CommonHeader } from '../../../../../shared/components/CommonHeader';
import { Colors } from '../../../../../shared/theme/theme';

type DetailRouteProp = RouteProp<RootStackParamList, 'ServiceDetail'>;

const ServiceDetailScreen = () => {
    const route = useRoute<DetailRouteProp>();
    const navigation = useNavigation();
    const { serviceId } = route.params;
    const [service, setService] = useState<Service | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadService();
    }, [serviceId]);

    const loadService = async () => {
        try {
            const data = await ServicesRepository.getInstance().getServiceById(serviceId);
            if (data) {
                setService(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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

                    <TouchableOpacity style={styles.bookButton} activeOpacity={0.8}>
                        <Text style={styles.bookButtonText}>Book Now</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ServiceDetailScreen;
