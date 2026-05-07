import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootStackParamList } from '../../../../../navigation/navigationTypes';
import { useResponsive } from '../../../../../shared/hooks/useResponsive';
import { useTheme } from '../../../../../shared/hooks/useTheme';
import { Spacing } from '../../../../../shared/theme/theme';
const Icon = MaterialIcon as any;

type RouteProps = RouteProp<RootStackParamList, 'BookingConfirmation'>;
type NavProps = NativeStackNavigationProp<RootStackParamList, 'BookingConfirmation'>;

const BookingConfirmationScreen = () => {
    const route = useRoute<RouteProps>();
    const navigation = useNavigation<NavProps>();
    const { bookingId, serviceName, status, message } = route.params;
    const { isLandscape, screenWidth } = useResponsive();
    const insets = useSafeAreaInsets();
    const { colors } = useTheme();

    const styles = useMemo(() => getStyles(isLandscape, colors), [isLandscape, screenWidth, colors]);

    const isConfirmed = status === 'confirmed';

    return (
        <View style={[
            styles.container,
            {
                paddingLeft: Math.max(Spacing.l, insets.left + Spacing.m),
                paddingRight: Math.max(Spacing.l, insets.right + Spacing.m),
                paddingBottom: Math.max(Spacing.l, insets.bottom + Spacing.m),
                paddingTop: Math.max(Spacing.l, insets.top + Spacing.s),
            },
        ]}>
            {/* Landscape: icon+text side-by-side; Portrait: vertical */}
            <View style={styles.topSection}>
                <Icon
                    name={isConfirmed ? 'check-circle' : 'clock-outline'}
                    size={isLandscape ? 60 : 80}
                    color={isConfirmed ? colors.success : colors.warning}
                />

                <View style={styles.titleBlock}>
                    <Text style={styles.title}>
                        {isConfirmed ? 'Booking Confirmed!' : 'Booking Pending'}
                    </Text>
                    <Text style={styles.message}>{message}</Text>
                </View>
            </View>

            <View style={styles.detailBox}>
                <Text style={styles.detailLabel}>Service</Text>
                <Text style={styles.detailValue}>{serviceName}</Text>

                <Text style={styles.detailLabel}>Booking ID</Text>
                <Text style={styles.detailValue}>{bookingId}</Text>

                <Text style={styles.detailLabel}>Status</Text>
                <Text style={[styles.detailValue, { color: isConfirmed ? colors.success : colors.warning }]}>
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

const getStyles = (isLandscape: boolean = false, colors?: any) => {
    const c = colors ?? {
        background: '#FFFFFF',
        secondaryBackground: '#F3F4F6',
        text: '#111827',
        textSecondary: '#4B5563',
        primary: '#22C55E',
        success: '#22C55E',
        warning: '#F59E0B',
    };

    return StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: c.background,
        },
        // Portrait: column; Landscape: row
        topSection: {
            flexDirection: isLandscape ? 'row' : 'column',
            alignItems: 'center',
            marginBottom: isLandscape ? Spacing.m : 0,
        },
        titleBlock: {
            alignItems: isLandscape ? 'flex-start' : 'center',
            marginLeft: isLandscape ? Spacing.m : 0,
            flex: isLandscape ? 1 : undefined,
        },
        title: {
            fontSize: isLandscape ? 18 : 24,
            fontWeight: '700',
            color: c.text,
            marginTop: isLandscape ? 0 : Spacing.m,
            marginBottom: Spacing.s,
            textAlign: isLandscape ? 'left' : 'center',
        },
        message: {
            fontSize: isLandscape ? 13 : 15,
            color: c.textSecondary,
            textAlign: isLandscape ? 'left' : 'center',
            marginBottom: isLandscape ? 0 : Spacing.l,
        },
        detailBox: {
            width: '100%',
            backgroundColor: c.secondaryBackground,
            borderRadius: 12,
            padding: isLandscape ? Spacing.s : Spacing.m,
            marginBottom: isLandscape ? Spacing.s : Spacing.l,
            gap: 4,
        },
        detailLabel: {
            fontSize: 12,
            color: c.textSecondary,
            marginTop: Spacing.s,
        },
        detailValue: {
            fontSize: isLandscape ? 13 : 15,
            fontWeight: '600',
            color: c.text,
        },
        button: {
            backgroundColor: c.primary,
            paddingVertical: isLandscape ? 10 : 14,
            paddingHorizontal: Spacing.xl,
            borderRadius: 10,
        },
        buttonText: {
            color: '#fff',
            fontSize: isLandscape ? 14 : 16,
            fontWeight: '600',
        },
    });
};

export default BookingConfirmationScreen;
