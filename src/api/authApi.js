import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const AUTH_API_URL = 'https://api.yourapp.com/auth';

export const registerUser = async (userData) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const refreshAuthToken = async (refreshToken) => {
  try {
    const response = await api.post(`${AUTH_API_URL}/refresh-token`, { refreshToken });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post(`${AUTH_API_URL}/logout`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};