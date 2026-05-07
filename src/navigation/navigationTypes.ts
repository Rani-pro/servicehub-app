import { NavigatorScreenParams } from '@react-navigation/native';

import { z } from 'zod';
import { BookingConfirmationNavParamsSchema, ServiceDetailNavParamsSchema } from '../shared/schema';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    MainDrawer: undefined;
    ServiceDetail: z.infer<typeof ServiceDetailNavParamsSchema>;
    BookingConfirmation: z.infer<typeof BookingConfirmationNavParamsSchema>;
    ChangePassword: undefined;
    Notifications: undefined;
};

export type DrawerParamList = {
    MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
    Settings: undefined;
    Profile: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    Services: undefined;
    Profile: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}