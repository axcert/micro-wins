import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthTokens } from '../../types/AuthTypes';

interface AuthState {
  isAuthenticated: boolean;
  tokens: AuthTokens | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  tokens: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.tokens = action.payload;
      state.isAuthenticated = true;
    },
    clearAuthTokens: (state) => {
      state.tokens = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthTokens, clearAuthTokens } = authSlice.actions;

export default authSlice.reducer;