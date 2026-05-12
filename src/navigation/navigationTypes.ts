import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    MainDrawer: undefined;
    ServiceDetail: { serviceId: string; title: string };
    BookingConfirmation: { bookingId: string; serviceName: string; status: string; message: string };
    ChangePassword: undefined;
    Notifications: undefined;
    EditProfile: undefined;
    Support: undefined;
    About: undefined;
    Feedback: undefined;
};

export type DrawerParamList = {
    MainTabs: NavigatorScreenParams<BottomTabParamList> | undefined;
    Settings: undefined;
    Profile: undefined;
    Notes: undefined;
    Services: undefined;
    Support: undefined;
    About: undefined;
    Feedback: undefined;
};

export type BottomTabParamList = {
    Home: undefined;
    Services: undefined;
    Profile: undefined;
    Settings: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}