import axios from 'axios';
import { API_URL } from '@/constants/api';
import {
  ApiResponse,
  ErrorResponse,
  User,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  AuthTokens
} from '@/types';

const authClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add response interceptor to handle errors
authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse: ErrorResponse = {
      success: false,
      message: 'Network error',
      error: error.message,
    };

    if (error.response) {
      errorResponse.message = error.response.data.message || 'Something went wrong';
      errorResponse.error = error.response.data.error;
      errorResponse.error_code = error.response.data.error_code;
    }

    return Promise.reject(errorResponse);
  }
);

export const authService = {
  /**
   * Login user with email and password
   */
  async login(data: LoginRequest): Promise<ApiResponse<{ user: User, tokens: AuthTokens }>> {
    try {
      const response = await authClient.post<ApiResponse<{ user: User, tokens: AuthTokens }>>('/auth/login', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Register new user
   */
  async register(data: RegisterRequest): Promise<ApiResponse<{ user: User, tokens: AuthTokens }>> {
    try {
      const response = await authClient.post<ApiResponse<{ user: User, tokens: AuthTokens }>>('/auth/register', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Logout user
   */
  async logout(token: string): Promise<ApiResponse<null>> {
    try {
      const response = await authClient.post<ApiResponse<null>>('/auth/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Send password reset email
   */
  async forgotPassword(data: ForgotPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await authClient.post<ApiResponse<{ message: string }>>('/auth/forgot-password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: ResetPasswordRequest): Promise<ApiResponse<{ message: string }>> {
    try {
      const response = await authClient.post<ApiResponse<{ message: string }>>('/auth/reset-password', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<ApiResponse<{ tokens: AuthTokens }>> {
    try {
      const response = await authClient.post<ApiResponse<{ tokens: AuthTokens }>>('/auth/refresh', {
        refresh_token: refreshToken
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};