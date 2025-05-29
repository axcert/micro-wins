import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    console.error('Error retrieving auth token:', error);
    return null;
  }
};

export const setAuthToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Error storing auth token:', error);
  }
};

export const getRefreshToken = async () => {
  try {
    const token = await AsyncStorage.getItem('refreshToken');
    return token;
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    return null;
  }
};

export const setRefreshToken = async (token) => {
  try {
    await AsyncStorage.setItem('refreshToken', token);
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
};

export const clearAuthTokens = async () => {
  try {
    await AsyncStorage.multiRemove(['authToken', 'refreshToken']);
  } catch (error) {
    console.error('Error clearing auth tokens:', error);
  }
};