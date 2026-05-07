const messaging = () => ({
    hasPermission: async () => 1,
    requestPermission: async () => 1,
    getToken: async () => 'dummy-fcm-token',
    onMessage: (cb: any) => { return () => { }; },
    onTokenRefresh: (cb: any) => { return () => { }; },
    setBackgroundMessageHandler: async () => { },
    subscribeToTopic: async () => { },
    unsubscribeFromTopic: async () => { }
});

export declare namespace FirebaseMessagingTypes {
    export interface RemoteMessage {
        data?: { [key: string]: string };
        notification?: { title?: string; body?: string };
    }
}

export default messaging;
