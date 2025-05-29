import axios, { AxiosError } from 'axios';
import * as Sentry from '@sentry/react-native';
import { store } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';

const apiClient = axios.create({
  baseURL: 'https://api.microwins.app/',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    config.headers['Authorization'] = `Bearer ${state.auth.accessToken}`;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
      // Network error or timeout
      Sentry.addBreadcrumb({
        category: 'api',
        message: 'Network error or timeout',
        level: Sentry.Severity.Warning,
        data: {
          url: error.config?.url,
          method: error.config?.method,
          error: error.message,
        },
      });

      store.dispatch(setOfflineMode(true));
    } else {
      // Log API errors to Sentry
      Sentry.setContext('api', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        error: error.response?.data,
      });
      
      Sentry.captureMessage('API Error');
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;