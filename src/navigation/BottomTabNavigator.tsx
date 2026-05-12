import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomTabParamList } from './navigationTypes';
import { useTheme } from '../shared/hooks/useTheme';
import { useResponsive } from '../shared/hooks/useResponsive';

// Screens
import HomeScreen from '../features/home/presentation/screens/HomeScreen';
import ServicesListScreen from '../features/services/presentation/screens/ServicesListScreen';
import ProfileScreen from '../features/profile/presentation/screens/ProfileScreen';
import SettingScreen from '../features/settings/presentation/screens/SettingScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
    const { colors } = useTheme();
    const insets = useSafeAreaInsets();
    const { isLandscape } = useResponsive();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
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
                        case 'Settings':
                            iconName = focused ? 'cog' : 'cog-outline';
                            break;
                        default:
                            iconName = 'circle';
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.background,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    paddingBottom: isLandscape ? 2 : 4,
                    paddingTop: isLandscape ? 2 : 4,
                    paddingLeft: insets.left,
                    paddingRight: insets.right,
                    height: isLandscape ? 40 : (insets.bottom > 0 ? 52 + insets.bottom : 52),
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
            <Tab.Screen name="Services" component={ServicesListScreen} options={{ tabBarLabel: 'Services' }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
            <Tab.Screen name="Settings" component={SettingScreen} options={{ tabBarLabel: 'Settings' }} />
        </Tab.Navigator>
    );
};

export default BottomTabNavigator;