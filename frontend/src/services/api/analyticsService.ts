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

export interface ProgressChart {
  date: string;
  value: number;
}

export const fetchDashboardSummary = async (dispatch: AppDispatch): Promise<DashboardSummary | null> => {
  try {
    const response = await apiClient.get<DashboardSummary>('/analytics/dashboard');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // JWT token expired, log out user
      dispatch(setOfflineMode(true));
    } else {
      // Log API errors to Sentry  
      Sentry.captureException(error);
    }
    return null;
  }
};

export const fetchProgressChartData = async (
  startDate: string, 
  endDate: string,
  page = 1,
  pageSize = 30
): Promise<ProgressChart[]> => {
  try {
    const response = await apiClient.get<ProgressChart[]>(
      `/analytics/progress?startDate=${startDate}&endDate=${endDate}&page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  } catch (error) {
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }  
};

export const exportProgressData = async (format: 'csv' | 'json'): Promise<string> => {
  try {
    const response = await apiClient.get<string>(`/analytics/export?format=${format}`);
    return response.data;
  } catch (error) {
    // Log API errors to Sentry
    Sentry.captureException(error);  
    return Promise.reject(error);
  }
};