export interface User {
  id: string;
  email: string;
  name: string;
  hasCompletedOnboarding: boolean;
  isPremium: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface RefreshTokenResponse {
  success: boolean;
  message: string;
  data: AuthTokens;
}

export interface BiometricAuthConfig {
  enabled: boolean;
  type: 'fingerprint' | 'faceId' | 'touchId';
  promptMessage: string;
}

export interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  biometricAuth: BiometricAuthConfig;
}

export interface VerifyEmailRequest {
  token: string;
  email: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
}