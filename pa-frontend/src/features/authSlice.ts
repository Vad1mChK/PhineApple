import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('/api/login', { email, password });
    return response.data;
});

export const registerUser = createAsyncThunk('auth/register', async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post('/api/register', { email, password });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                },
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, _action) => {
                    state.loading = false;
                    state.error = 'Error';
                },
            );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
