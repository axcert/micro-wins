import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode, setAuthState, logout } from '../../store/slices/authSlice';
import * as Sentry from '@sentry/react-native';
import * as Keychain from 'react-native-keychain';
import { persistor } from '../../store';

const AUTH_TOKEN_KEY = 'authToken';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  userId: string;
}

export const login = async (dispatch: AppDispatch, email: string, password: string): Promise<void> => {
  try {
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      email,
      password,  
    });

    const { accessToken, refreshToken, userId } = response.data;
    
    await Keychain.setGenericPassword(AUTH_TOKEN_KEY, JSON.stringify({
      accessToken,
      refreshToken,
    }));

    dispatch(setAuthState({
      isAuthenticated: true,  
      accessToken,
      userId,
    }));
  } catch (error) {
    const axiosError = error as AxiosError;
    if (!axiosError.response) {
      dispatch(setOfflineMode(true));
      return;  
    }
    
    // Log API errors to Sentry
    Sentry.captureException(error);
  }
};

export const register = async (dispatch: AppDispatch, email: string, password: string): Promise<void> => {
  try {
    await apiClient.post('/auth/register', {
      email,
      password,
    });

    dispatch(login(dispatch, email, password));
  } catch (error) {
    // Log API errors to Sentry
    Sentry.captureException(error);  
  }  
};

export const logoutUser = async (dispatch: AppDispatch): Promise<void> => {
  try {
    await apiClient.post('/auth/logout');
    await Keychain.resetGenericPassword();
    
    dispatch(logout());
    persistor.purge();
  } catch (error) {
    Sentry.captureException(error);
  }
};

export const checkAuth = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    
    if (credentials) {
      const { accessToken, refreshToken } = JSON.parse(credentials.password);
      
      // TODO: Check token expiration and refresh if needed
      dispatch(setAuthState({
        isAuthenticated: true,
        accessToken,
      }));
    }
  } catch (error) {
    Sentry.captureException(error);
  }  
};