module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    alias: {
                        '@': './',
                        '@react-native-firebase/app': './src/mocks/firebaseAppMock',
                        '@react-native-firebase/auth': './src/mocks/firebaseAuthMock',
                        '@react-native-firebase/messaging': './src/mocks/firebaseMessagingMock',
                        '@react-native-firebase/crashlytics': './src/mocks/firebaseCrashlyticsMock',
                        '@react-native-firebase/analytics': './src/mocks/firebaseAnalyticsMock'
                    }
                }
            ],
            'react-native-reanimated/plugin'
        ]
    };
};
