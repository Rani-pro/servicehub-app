import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
const Icon = MaterialIcon as any;
import { RootStackParamList } from '../../../../../navigation/navigationTypes';
import { Colors, Spacing } from '../../../../../shared/theme/theme';

type RouteProps = RouteProp<RootStackParamList, 'BookingConfirmation'>;
type NavProps = NativeStackNavigationProp<RootStackParamList, 'BookingConfirmation'>;

const BookingConfirmationScreen = () => {
    const route = useRoute<RouteProps>();
    const navigation = useNavigation<NavProps>();
    const { bookingId, serviceName, status, message } = route.params;

    const isConfirmed = status === 'confirmed';

    return (
        <View style={styles.container}>
            <Icon
                name={isConfirmed ? 'check-circle' : 'clock-outline'}
                size={80}
                color={isConfirmed ? Colors.success : Colors.warning}
            />

            <Text style={styles.title}>
                {isConfirmed ? 'Booking Confirmed!' : 'Booking Pending'}
            </Text>

            <Text style={styles.message}>{message}</Text>

            <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Service</Text>
                <Text style={styles.detailValue}>{serviceName}</Text>

                <Text style={styles.detailLabel}>Booking ID</Text>
                <Text style={styles.detailValue}>{bookingId}</Text>

                <Text style={styles.detailLabel}>Status</Text>
                <Text style={[styles.detailValue, { color: isConfirmed ? Colors.success : Colors.warning }]}>
                    {status.toUpperCase()}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('MainDrawer')}
                activeOpacity={0.8}
            >
                <Text style={styles.buttonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: Spacing.l,
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: Colors.text,
        marginTop: Spacing.m,
        marginBottom: Spacing.s,
    },
    message: {
        fontSize: 15,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.l,
    },
    detailBox: {
        width: '100%',
        backgroundColor: Colors.secondaryBackground,
        borderRadius: 12,
        padding: Spacing.m,
        marginBottom: Spacing.l,
        gap: 4,
    },
    detailLabel: {
        fontSize: 12,
        color: Colors.textSecondary,
        marginTop: Spacing.s,
    },
    detailValue: {
        fontSize: 15,
        fontWeight: '600',
        color: Colors.text,
    },
    noticeText: {
        fontSize: 13,
        color: Colors.textSecondary,
        textAlign: 'center',
        marginBottom: Spacing.l,
    },
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        paddingHorizontal: Spacing.xl,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default BookingConfirmationScreen;
