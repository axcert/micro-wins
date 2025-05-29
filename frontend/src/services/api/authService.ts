import axios from 'axios';
import { API_URL } from '../../constants/config';
import { LoginData, RegisterData, AuthTokens } from '../../types/AuthTypes';
import * as SecureStore from 'expo-secure-store';
import * as LocalAuthentication from 'expo-local-authentication';

const AUTH_TOKENS_KEY = 'authTokens';

export const register = async (registerData: RegisterData): Promise<void> => {
  try {
    await axios.post(`${API_URL}/auth/register`, registerData);
  } catch (err) {
    console.error('Error registering user:', err);
    throw err;
  }
};

export const login = async (loginData: LoginData): Promise<AuthTokens> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    const tokens = response.data;
    await SecureStore.setItemAsync(AUTH_TOKENS_KEY, JSON.stringify(tokens));
    return tokens;
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(AUTH_TOKENS_KEY);
  } catch (err) {
    console.error('Error logging out:', err);
    throw err;
  }
};

export const refreshTokens = async (refreshToken: string): Promise<AuthTokens> => {
  try {
    const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
    const tokens = response.data;
    await SecureStore.setItemAsync(AUTH_TOKENS_KEY, JSON.stringify(tokens));
    return tokens;
  } catch (err) {
    console.error('Error refreshing tokens:', err);
    throw err;  
  }
};

export const getAuthTokens = async (): Promise<AuthTokens | null> => {
  try {
    const tokensString = await SecureStore.getItemAsync(AUTH_TOKENS_KEY);
    return tokensString ? JSON.parse(tokensString) : null;
  } catch (err) {
    console.error('Error getting auth tokens:', err);
    throw err;
  }
};

export const setAuthTokens = async (tokens: AuthTokens): Promise<void> => {
  try {
    await SecureStore.setItemAsync(AUTH_TOKENS_KEY, JSON.stringify(tokens));
  } catch (err) {
    console.error('Error setting auth tokens:', err);
    throw err;
  }
};

export const authenticateWithBiometrics = async (): Promise<boolean> => {
  try {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      console.log('Biometric hardware not available');
      return false;
    }

    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      console.log('No biometric records enrolled');
      return false;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
    });

    return result.success;
  } catch (err) {
    console.error('Biometric authentication error:', err);
    return false;
  }
};