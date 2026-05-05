import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    Splash: undefined;
    Login: undefined;
    MainDrawer: undefined;
    ServiceDetail: { serviceId: string; title: string };
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