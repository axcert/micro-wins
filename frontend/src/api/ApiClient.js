import axios from 'axios';
import { getAccessToken, refreshAccessToken } from '../services/AuthService';
import { isNetworkAvailable } from '../utils/NetworkUtils';
import Config from '../config';

const ApiClient = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

ApiClient.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

ApiClient.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;

  if (error.response) {
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshedToken = await refreshAccessToken();
        if (refreshedToken) {
          ApiClient.defaults.headers.common['Authorization'] = `Bearer ${refreshedToken}`;
          return ApiClient(originalRequest);
        }
      } catch (refreshError) {
        console.error('Failed to refresh token:', refreshError);
        // Redirect to login if refresh fails
        // NavigationService.navigate('Auth');
      }
    }

    // Log other API errors
    console.error(
      `API Error: [${error.response.status}] ${error.response.data?.message || error.message}`
    );
  } else if (error.request) {
    // Log request errors
    console.error(`API Request Error: ${error.message}`);
  } else {
    // Log generic errors
    console.error(`API Generic Error: ${error.message}`);
  }
  
  // Add failed request to offline queue if network is unavailable
  if (!isNetworkAvailable()) {
    // TODO: Implement offline request queue
    console.warn('API request added to offline queue');
  }

  return Promise.reject(error);
});

export default ApiClient;