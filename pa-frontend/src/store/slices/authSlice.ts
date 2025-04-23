import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    email: string | null;
}

const initialState: AuthState = {
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    email: localStorage.getItem('email'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action: PayloadAction<{ token: string; email: string }>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.isAuthenticated = true;
            localStorage.setItem('token', action.payload.token);
            localStorage.setItem('email', action.payload.email);
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
            state.email = null;
            localStorage.clear();
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
