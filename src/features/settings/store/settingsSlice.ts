import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getItem, setItem } from '../../../core/storage/asyncStorage';
import { STORAGE_KEYS } from '../../../core/storage/storageKeys';
import { SettingsStateData } from '../../../shared/schema';
import { ThemeMode } from '../../../shared/theme/theme';

const initialState: SettingsStateData = {
    isLoading: false,
    error: null,
    theme: 'light',
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
            // Persist to AsyncStorage (fire-and-forget)
            setItem(STORAGE_KEYS.USER.THEME, action.payload);
        },
    },
});

export const { setLoading, setError, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;

/** Load persisted theme from AsyncStorage and dispatch setTheme */
export const loadPersistedTheme = () => async (dispatch: any) => {
    const saved = await getItem<ThemeMode>(STORAGE_KEYS.USER.THEME);
    if (saved === 'light' || saved === 'dark') {
        dispatch(setTheme(saved));
    }
};
