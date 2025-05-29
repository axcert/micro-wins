import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Config from 'react-native-config';

// Types
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

interface QueuedRequest {
  config: AxiosRequestConfig;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

interface TokenRefreshResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

// Constants
const API_TIMEOUT = 30000; // 30 seconds
const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000; // 1 second

// Storage keys
const AUTH_TOKEN_KEY = '@MicroWins:authToken';
const REFRESH_TOKEN_KEY = '@MicroWins:refreshToken';
const REQUEST_QUEUE_KEY = '@MicroWins:offlineQueue';

class ApiClient {
  private static instance: ApiClient;
  private axiosInstance: AxiosInstance;
  private isRefreshing: boolean = false;
  private failedQueue: QueuedRequest[] = [];
  private offlineQueue: QueuedRequest[] = [];
  private isOnline: boolean = true;
  private retryTimeouts: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {
    this.axiosInstance = this.createAxiosInstance();
    this.setupInterceptors();
    this.setupNetworkListener();
    this.loadOfflineQueue();
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  /**
   * Create and configure axios instance
   */
  private createAxiosInstance(): AxiosInstance {
    const baseURL = this.getBaseURL();
    
    const config: ApiConfig = {
      baseURL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    if (__DEV__) {
      console.log('API Client initialized with baseURL:', baseURL);
    }

    return axios.create(config);
  }

  /**
   * Get base URL based on environment
   */
  private getBaseURL(): string {
    // Environment-based URL switching
    if (__DEV__) {
      return Config.DEV_API_URL || 'http://localhost:8000';
    }
    
    if (Config.STAGING_ENV === 'true') {
      return Config.STAGING_API_URL || 'https://staging-api.microwinds.app';
    }
    
    return Config.PROD_API_URL || 'https://api.microwinds.app';
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        // Add auth token to requests
        const token = await this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log requests in development
        if (__DEV__) {
          console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, {
            params: config.params,
            data: config.data,
          });
        }

        // Check network status
        if (!this.isOnline) {
          // Queue request for later
          return this.queueOfflineRequest(config);
        }

        return config;
      },
      (error) => {
        console.error('[API] Request error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Log responses in development
        if (__DEV__) {
          console.log(`[API] Response ${response.config.url}:`, response.data);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Handle 401 errors globally
        if (error.response?.status === 401 && !originalRequest._retry) {
          return this.handle401Error(originalRequest);
        }

        // Handle network errors with retry logic
        if (!error.response && error.code === 'ECONNABORTED') {
          return this.retryRequest(originalRequest);
        }

        // Log errors
        console.error('[API] Response error:', {
          url: originalRequest?.url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });

        return Promise.reject(error);
      }
    );
  }

  /**
   * Handle 401 authentication errors
   */
  private async handle401Error(originalRequest: AxiosRequestConfig & { _retry?: boolean }): Promise<any> {
    if (this.isRefreshing) {
      // Wait for token refresh to complete
      return new Promise((resolve, reject) => {
        this.failedQueue.push({ config: originalRequest, resolve, reject });
      });
    }

    originalRequest._retry = true;
    this.isRefreshing = true;

    try {
      const newToken = await this.refreshAuthToken();
      
      // Update token in storage
      await AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
      
      // Retry original request with new token
      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      
      // Process queued requests
      this.processFailedQueue(null, newToken);
      
      return this.axiosInstance(originalRequest);
    } catch (refreshError) {
      // Token refresh failed, logout user
      this.processFailedQueue(refreshError, null);
      await this.clearAuthTokens();
      
      // Emit logout event for app to handle
      // You can use an event emitter or navigation service here
      console.error('Token refresh failed, user needs to login again');
      
      return Promise.reject(refreshError);
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Refresh authentication token
   */
  private async refreshAuthToken(): Promise<string> {
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await this.axiosInstance.post<TokenRefreshResponse>('/api/auth/refresh', {
      refresh_token: refreshToken,
    });

    const { access_token, refresh_token } = response.data;
    
    // Update stored tokens
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, access_token);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
    
    return access_token;
  }

  /**
   * Process queued requests after token refresh
   */
  private processFailedQueue(error: any, token: string | null): void {
    this.failedQueue.forEach((request) => {
      if (error) {
        request.reject(error);
      } else {
        if (request.config.headers && token) {
          request.config.headers.Authorization = `Bearer ${token}`;
        }
        request.resolve(this.axiosInstance(request.config));
      }
    });
    
    this.failedQueue = [];
  }

  /**
   * Retry failed request with exponential backoff
   */
  private async retryRequest(
    config: AxiosRequestConfig,
    retryCount: number = 0
  ): Promise<AxiosResponse> {
    if (retryCount >= MAX_RETRY_ATTEMPTS) {
      throw new Error(`Request failed after ${MAX_RETRY_ATTEMPTS} attempts`);
    }

    const delay = RETRY_DELAY * Math.pow(2, retryCount);
    const requestKey = `${config.method}-${config.url}`;

    // Clear any existing retry timeout
    const existingTimeout = this.retryTimeouts.get(requestKey);
    if (existingTimeout) {
      clearTimeout(existingTimeout);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(async () => {
        try {
          console.log(`[API] Retrying request (attempt ${retryCount + 1}/${MAX_RETRY_ATTEMPTS})`);
          const response = await this.axiosInstance(config);
          this.retryTimeouts.delete(requestKey);
          resolve(response);
        } catch (error) {
          if (retryCount < MAX_RETRY_ATTEMPTS - 1) {
            resolve(this.retryRequest(config, retryCount + 1));
          } else {
            this.retryTimeouts.delete(requestKey);
            reject(error);
          }
        }
      }, delay);

      this.retryTimeouts.set(requestKey, timeout);
    });
  }

  /**
   * Setup network status listener
   */
  private setupNetworkListener(): void {
    NetInfo.addEventListener((state) => {
      const wasOffline = !this.isOnline;
      this.isOnline = state.isConnected && state.isInternetReachable !== false;

      if (__DEV__) {
        console.log('[API] Network status:', this.isOnline ? 'Online' : 'Offline');
      }

      // Process offline queue when coming back online
      if (wasOffline && this.isOnline) {
        this.processOfflineQueue();
      }
    });
  }

  /**
   * Queue request for offline processing
   */
  private async queueOfflineRequest(config: AxiosRequestConfig): Promise<any> {
    return new Promise((resolve, reject) => {
      const queuedRequest: QueuedRequest = { config, resolve, reject };
      this.offlineQueue.push(queuedRequest);
      this.saveOfflineQueue();

      console.log('[API] Request queued for offline processing:', config.url);
    });
  }

  /**
   * Process offline queue when network is available
   */
  private async processOfflineQueue(): Promise<void> {
    if (this.offlineQueue.length === 0) return;

    console.log(`[API] Processing ${this.offlineQueue.length} offline requests`);

    const queue = [...this.offlineQueue];
    this.offlineQueue = [];

    for (const request of queue) {
      try {
        const response = await this.axiosInstance(request.config);
        request.resolve(response);
      } catch (error) {
        request.reject(error);
      }
    }

    await this.saveOfflineQueue();
  }

  /**
   * Save offline queue to storage
   */
  private async saveOfflineQueue(): Promise<void> {
    try {
      const queueData = this.offlineQueue.map(({ config }) => config);
      await AsyncStorage.setItem(REQUEST_QUEUE_KEY, JSON.stringify(queueData));
    } catch (error) {
      console.error('[API] Failed to save offline queue:', error);
    }
  }

  /**
   * Load offline queue from storage
   */
  private async loadOfflineQueue(): Promise<void> {
    try {
      const queueData = await AsyncStorage.getItem(REQUEST_QUEUE_KEY);
      if (queueData) {
        const configs = JSON.parse(queueData) as AxiosRequestConfig[];
        // Note: We can't restore the promises, so these will need to be retried manually
        console.log(`[API] Loaded ${configs.length} offline requests from storage`);
      }
    } catch (error) {
      console.error('[API] Failed to load offline queue:', error);
    }
  }

  /**
   * Get stored auth token
   */
  private async getAuthToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('[API] Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * Clear authentication tokens
   */
  private async clearAuthTokens(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY]);
    } catch (error) {
      console.error('[API] Failed to clear auth tokens:', error);
    }
  }

  /**
   * Public method to set auth tokens
   */
  public async setAuthTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await AsyncStorage.multiSet([
        [AUTH_TOKEN_KEY, accessToken],
        [REFRESH_TOKEN_KEY, refreshToken],
      ]);
    } catch (error) {
      console.error('[API] Failed to set auth tokens:', error);
      throw error;
    }
  }

  /**
   * Public method to clear all auth data
   */
  public async logout(): Promise<void> {
    await this.clearAuthTokens();
    this.failedQueue = [];
    this.offlineQueue = [];
    await this.saveOfflineQueue();
  }

  /**
   * Get axios instance for direct use
   */
  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * Convenience methods for HTTP verbs
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.axiosInstance.patch<T>(url, data, config);
  }
}

// Export singleton instance
export const apiClient = ApiClient.getInstance();