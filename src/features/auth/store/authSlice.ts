import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateData, UserModel } from '../../../shared/schema';

const initialState: AuthStateData = {
    user: null,
    isLoading: true,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserModel | null>) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        logout: (state) => {
            state.user = null;
            state.isLoading = false;
        },
    },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;
