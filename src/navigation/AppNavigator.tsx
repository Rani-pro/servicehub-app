import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
// Screens
import LoginScreen from '../features/auth/presentation/screens/LoginScreen';
import BookingConfirmationScreen from '../features/bookings/presentation/screens/BookingConfirmationScreen';
import NotificationsScreen from '../features/notifications/presentation/screens/NotificationsScreen';
import ServiceDetailScreen from '../features/services/presentation/screens/ServiceDetailScreen';
import ChangePasswordScreen from '../features/settings/presentation/screens/ChangePasswordScreen';
import SplashScreen from '../features/splash/presentation/screens/SplashScreen';
// Navigators
import { useTheme } from '../shared/hooks/useTheme';
import { DarkColors, LightColors } from '../shared/theme/theme';
import { RootState } from '../store/store';
import DrawerNavigator from './DrawerNavigator';
import { navigationRef } from './navigationRef';
import { RootStackParamList } from './navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Custom nav themes using our app colors
const AppLightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: LightColors.background,
        card: LightColors.background,
        text: LightColors.text,
        border: LightColors.border,
        primary: LightColors.primary,
    },
};

const AppDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: DarkColors.background,
        card: DarkColors.secondaryBackground,
        text: DarkColors.text,
        border: DarkColors.border,
        primary: DarkColors.primary,
    },
};

const AppNavigator = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const { isDark } = useTheme();
    const routeNameRef = React.useRef<string | undefined>(undefined);

    return (
        <>
            <StatusBar
                barStyle={isDark ? 'light-content' : 'dark-content'}
                backgroundColor={isDark ? DarkColors.background : LightColors.background}
            />
            <NavigationContainer
                theme={isDark ? AppDarkTheme : AppLightTheme}
                ref={navigationRef}
                onReady={() => {
                    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
                }}
                onStateChange={() => {
                    const previousRouteName = routeNameRef.current;
                    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

                    if (previousRouteName !== currentRouteName && __DEV__) {
                        console.log('[navigation] screen changed to:', currentRouteName);
                    }
                    routeNameRef.current = currentRouteName;
                }}
            >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isLoading ? (
                    <Stack.Screen name="Splash" component={SplashScreen} />
                ) : user ? (
                    <>
                        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
                        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
                        <Stack.Screen name="BookingConfirmation" component={BookingConfirmationScreen} />
                        <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
                        <Stack.Screen name="Notifications" component={NotificationsScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default AppNavigator;