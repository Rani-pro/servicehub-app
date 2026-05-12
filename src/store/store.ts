import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/store/authSlice';
import settingsReducer from '../features/settings/store/settingsSlice';
import notificationReducer from '../features/notifications/store/notificationSlice';
import notesReducer from '../features/notes/store/notesSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        settings: settingsReducer,
        notifications: notificationReducer,
        notes: notesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
