import axios from 'axios';
import * as Sentry from '@sentry/react-native';
import { store } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';

const axiosInstance = axios.create({
  baseURL: 'https://api.microwins.app',
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    Sentry.addBreadcrumb({
      category: 'API Request',
      message: `${config.method?.toUpperCase()} ${config.url}`,
      level: Sentry.Severity.Info,
    });
    return config;
  },
  (error) => {
    Sentry.captureException(error);
    return Promise.reject(error);
  },
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status code
      Sentry.captureException(error, {
        tags: {
          type: 'API Error',
          status: error.response.status,
        },
        extra: {
          method: error.config.method,
          path: error.config.url,
          data: error.config.data,
          response: error.response.data,
        },
      });
    } else if (error.request) {
      // No response received
      store.dispatch(setOfflineMode(true));
    } else {
      // Other errors
      Sentry.captureException(error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;