import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SettingsState } from '../types';
import { ThemeMode } from '../../../shared/theme/theme';

const initialState: SettingsState = {
    isLoading: false,
    error: null,
    theme: 'light',
    pushNotificationsEnabled: false,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        setTheme: (state, action: PayloadAction<ThemeMode>) => {
            state.theme = action.payload;
        },
        setPushNotificationsEnabled: (state, action: PayloadAction<boolean>) => {
            state.pushNotificationsEnabled = action.payload;
        },
    },
});

export const { setLoading, setError, setTheme, setPushNotificationsEnabled } = settingsSlice.actions;
export default settingsSlice.reducer;

