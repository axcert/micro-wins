import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../services/Api';
import { saveTokens, clearTokens } from '../utils/tokenStorage';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const response = await Api.login(email, password);
    await saveTokens(response.tokens);
    return response.user;
  }
);

export const register = createAsyncThunk(
  'auth/register', 
  async ({ email, password }) => {
    const response = await Api.register(email, password);
    await saveTokens(response.tokens);
    return response.user;
  }  
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await Api.logout();
    await clearTokens();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;