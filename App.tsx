import { useEffect } from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch } from 'react-redux';
import { loadPersistedTheme } from './src/features/settings/store/settingsSlice';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';

function AppContent() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Load saved theme on app start
        dispatch(loadPersistedTheme() as any);
    }, []);

    return <AppNavigator />;
}

export default function App() {
    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <AppContent />
            </Provider>
        </SafeAreaProvider>
    );
}
