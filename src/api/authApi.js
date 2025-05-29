import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const AUTH_API_URL = 'https://api.yourapp.com/auth';

export const registerUser = async (userData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error, 'Error registering user');
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    handleError(error, 'Error logging in user');
    return null;
  }
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/refresh`, { refreshToken });
    return response.data;
  } catch (error) {
    handleError(error, 'Error refreshing auth token');
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post(`${AUTH_API_URL}/logout`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error logging out user');
    return null;
  }
};

export const requestPasswordReset = async (email) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/forgot-password`, { email });
    return response.data;
  } catch (error) {
    handleError(error, 'Error requesting password reset');
    return null;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/reset-password`, { token, newPassword });
    return response.data;
  } catch (error) {
    handleError(error, 'Error resetting password');
    return null;
  }
};

export const verifyEmail = async (token) => {
  try {
    const response = await api.get(`${AUTH_API_URL}/verify-email/${token}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error verifying email');
    return null;
  }
};