import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import * as Sentry from '@sentry/react-native';
import { store } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';
import { logout } from '../../store/slices/authSlice';
import NetInfo from '@react-native-community/netinfo';
import { queueRequest, executeRequestQueue } from './offlineQueue';

const API_BASE_URL = {
  development: 'https://dev-api.microwins.app',
  staging: 'https://staging-api.microwins.app', 
  production: 'https://api.microwins.app',
};

const apiClient = axios.create({
  baseURL: API_BASE_URL[process.env.NODE_ENV],
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const state = store.getState();
    
    if (state.auth.accessToken) {
      config.headers['Authorization'] = `Bearer ${state.auth.accessToken}`;
    }

    const isConnected = await NetInfo.fetch().then(state => state.isConnected);
    
    if (!isConnected) {
      await queueRequest(config);
      return Promise.reject('offline');
    }
    
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshedToken = await refreshAuthToken();
          
          if (refreshedToken) {
            store.dispatch(setAuthState({ accessToken: refreshedToken }));
            originalRequest.headers['Authorization'] = `Bearer ${refreshedToken}`;
            return apiClient(originalRequest);  
          }
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
      
      Sentry.captureException(error);
    } else if (error.request) {
      Sentry.captureException(error);
      store.dispatch(setOfflineMode(true));
    } else {
      Sentry.captureException(error);
    }
    
    return Promise.reject(error);
  }
);

const refreshAuthToken = async (): Promise<string | null> => {
  // TODO: Implement token refresh logic
  return null;
};

NetInfo.addEventListener(async (state) => {
  if (state.isConnected) {
    store.dispatch(setOfflineMode(false));
    await executeRequestQueue();
  } else {
    store.dispatch(setOfflineMode(true));
  }
});

export default apiClient;