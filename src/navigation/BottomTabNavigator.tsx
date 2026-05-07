import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useResponsive } from '../shared/hooks/useResponsive';
import { useTheme } from '../shared/hooks/useTheme';
import { BottomTabParamList } from './navigationTypes';

// Screens
import HomeScreen from '../features/home/presentation/screens/HomeScreen';
import ProfileScreen from '../features/profile/presentation/screens/ProfileScreen';
import ServicesListScreen from '../features/services/presentation/screens/ServicesListScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { isLandscape } = useResponsive();

    // In landscape, reduce tab bar height; use safe area bottom padding
    const tabBarHeight = isLandscape ? 48 : (Platform.OS === 'ios' ? 56 : 56);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarLabelPosition: 'below-icon',
                tabBarItemStyle: { flex: 1 },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Services':
                            iconName = focused ? 'tools' : 'tools';
                            break;
                        case 'Profile':
                            iconName = focused ? 'account' : 'account-outline';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={isLandscape ? 20 : size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: tabBarHeight + insets.bottom,
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 4,
                    paddingTop: 4,
                },
                tabBarLabelStyle: {
                    fontSize: isLandscape ? 10 : 12,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Services"
                component={ServicesListScreen}
                options={{ tabBarLabel: 'Services' }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;