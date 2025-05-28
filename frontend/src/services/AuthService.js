import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = async () => {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

export const setAccessToken = async (token) => {
  return AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const getRefreshToken = async () => {
  return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshToken = async (token) => {
  return AsyncStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const refreshAccessToken = async () => {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }
  
  // TODO: Implement token refresh API call
  // const response = await ApiClient.post('/auth/token', { refreshToken });
  // const { accessToken } = response.data;
  // await setAccessToken(accessToken);
  // return accessToken;

  console.warn('TODO: Implement token refresh');
  return null;
};