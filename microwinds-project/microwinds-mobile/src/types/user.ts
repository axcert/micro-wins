export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  hasCompletedOnboarding: boolean;
  isPremium: boolean;
  preferences: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  notifications: boolean;
  dailyReminderTime?: string;
  theme: 'light' | 'dark' | 'system';
  weekStartsOn: 0 | 1 | 6; // 0 for Sunday, 1 for Monday, 6 for Saturday
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isLoading: boolean;
  error: string | null;
}