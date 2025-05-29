import axios from 'axios';
import { getAuthToken, getRefreshToken, setAuthToken } from '../utils/authUtils';
import { handleError } from '../utils/errorUtils';
import NetInfo from '@react-native-community/netinfo';
import messaging from '@react-native-firebase/messaging';

const API_BASE_URL = process.env.API_BASE_URL || 'https://api.yourapp.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await getRefreshToken();
        const response = await apiClient.post('/auth/refresh-token', { refreshToken });
        const { token } = response.data;
        await setAuthToken(token);
        
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error, e.g., clear tokens and log out user
        return Promise.reject(refreshError);
      }
    }

    handleError(error);
    return Promise.reject(error);
  }
);

const detectNetworkStatus = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

const queueOfflineRequests = async (request) => {
  const queue = await AsyncStorage.getItem('offlineRequestQueue');
  const requests = queue ? JSON.parse(queue) : [];
  requests.push(request);
  await AsyncStorage.setItem('offlineRequestQueue', JSON.stringify(requests));
};

const processOfflineQueue = async () => {
  const isConnected = await detectNetworkStatus();
  if (isConnected) {
    const queue = await AsyncStorage.getItem('offlineRequestQueue');
    const requests = queue ? JSON.parse(queue) : [];

    for (const request of requests) {
      try {
        await apiClient(request);
      } catch (error) {
        console.error('Error processing offline request:', error);
      }
    }

    await AsyncStorage.removeItem('offlineRequestQueue');
  }
};

messaging().onMessage(async (remoteMessage) => {
  console.log('Notification received in foreground:', remoteMessage);
  // Handle foreground notification
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Notification received in background:', remoteMessage);
  // Handle background notification 
});

export default apiClient;