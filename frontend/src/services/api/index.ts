import axios, { AxiosError, AxiosInstance } from 'axios';
import { API_URL } from '../../constants/config';
import { getAuthTokens, refreshTokens, clearAuthTokens } from '../authService';
import NetInfo from '@react-native-community/netinfo';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await getAuthTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const token = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await refreshTokens();
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${tokens.accessToken}`;
        processQueue(null, tokens.accessToken);
        return axiosInstance(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await clearAuthTokens();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Network status change
NetInfo.addEventListener((state) => {
  if (!state.isConnected) {
    console.warn('Network connection lost');
  }
});

export default axiosInstance;