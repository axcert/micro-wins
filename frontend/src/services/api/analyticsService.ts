import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';
import * as Sentry from '@sentry/react-native';

export interface DashboardSummary {
  totalGoals: number;
  activeGoals: number; 
  completionRate: number;
  currentStreak: number;
  longestStreak: number;
}

export interface ProgressDataPoint {
  date: string;
  totalSteps: number;
  completedSteps: number;
}

export const fetchDashboardSummary = async (dispatch: AppDispatch): Promise<DashboardSummary | null> => {
  try {
    const response = await apiClient.get<DashboardSummary>('/analytics/dashboard');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (!axiosError.response) {
      dispatch(setOfflineMode(true));
      return null;
    }
    
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const fetchProgressHistory = async (
  dispatch: AppDispatch, 
  userId: string,
  dateRange: 'week' | 'month'
): Promise<ProgressDataPoint[]> => {
  try {
    const response = await apiClient.get<ProgressDataPoint[]>(`/analytics/progress/${userId}`, {
      params: { dateRange },  
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (!axiosError.response) {
      dispatch(setOfflineMode(true));
      return [];
    }
    
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const exportProgressData = async (format: 'csv' | 'json'): Promise<string> => {
  try {
    const response = await apiClient.get<string>(`/analytics/export?format=${format}`);
    return response.data;
  } catch (error) {
    Sentry.captureException(error);  
    return Promise.reject(error);
  }
};