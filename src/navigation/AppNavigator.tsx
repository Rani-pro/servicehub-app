import React from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import analytics from '@react-native-firebase/analytics';
import { useSelector } from 'react-redux';
// Screens
import SplashScreen from '../features/splash/presentation/screens/SplashScreen';
import LoginScreen from '../features/auth/presentation/screens/LoginScreen';
import ServiceDetailScreen from '../features/services/presentation/screens/ServiceDetailScreen';
import ChangePasswordScreen from '../features/settings/presentation/screens/ChangePasswordScreen';
import NotificationsScreen from '../features/notifications/presentation/screens/NotificationsScreen';
import BookingConfirmationScreen from '../features/bookings/presentation/screens/BookingConfirmationScreen';
import EditProfileScreen from '../features/profile/presentation/screens/EditProfileScreen';
import SupportScreen from '../features/support/presentation/screens/SupportScreen';
import AboutScreen from '../features/about/presentation/screens/AboutScreen';
import FeedbackScreen from '../features/support/presentation/screens/FeedbackScreen';
// Navigators
import DrawerNavigator from './DrawerNavigator';
import { RootState } from '../store/store';
import { RootStackParamList } from './navigationTypes';
import { navigationRef } from './navigationRef';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const routeNameRef = React.useRef<string | undefined>(undefined);
    
    return (
        <NavigationContainer 
            ref={navigationRef}
            onReady={() => {
                routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
            }}
            onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

                if (previousRouteName !== currentRouteName) {
                    try {
                        await analytics().logScreenView({
                            screen_name: currentRouteName ?? 'unknown',
                            screen_class: currentRouteName ?? 'unknown',
                        });
                    } catch (e) {
                        if (__DEV__) {
                            console.warn('[analytics] logScreenView failed', e);
                        }
                    }
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
                        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
                        <Stack.Screen name="Support" component={SupportScreen} />
                        <Stack.Screen name="About" component={AboutScreen} />
                        <Stack.Screen name="Feedback" component={FeedbackScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Login" component={LoginScreen} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;