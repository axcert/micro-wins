import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, logoutUser } from '../api/authApi';

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, clearUser, setLoading, setError, clearError } = authSlice.actions;

export const loginAsync = (credentials) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    const data = await loginUser(credentials);
    dispatch(setUser(data.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const registerAsync = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    const data = await registerUser(userData);
    dispatch(setUser(data.user));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const logoutAsync = () => async (dispatch) => {
  dispatch(setLoading(true));
  dispatch(clearError());

  try {
    await logoutUser();
    dispatch(clearUser());
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;