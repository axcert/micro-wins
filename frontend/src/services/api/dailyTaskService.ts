import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';
import * as Sentry from '@sentry/react-native';

export interface DailyTask {
  id: string;
  goalId: string;
  title: string;
  description: string;
  completedAt: string | null;
  skippedAt: string | null;
  swappedAt: string | null;
}

export const fetchDailyTask = async (dispatch: AppDispatch): Promise<DailyTask | null> => {
  try {
    const response = await apiClient.get<DailyTask>('/dailyTask');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // Unauthorized, logout user
      dispatch(setOfflineMode(true));
    } else {
      // Log API errors to Sentry
      Sentry.captureException(error);  
      dispatch(setOfflineMode(true));
    }
    return null;
  }
};

export const completeTask = async (taskId: string): Promise<void> => {
  try {
    await apiClient.post(`/dailyTask/${taskId}/complete`);
  } catch (error) {
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const skipTask = async (taskId: string): Promise<void> => {
  try {
    await apiClient.post(`/dailyTask/${taskId}/skip`);
  } catch (error) {   
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const swapTask = async (taskId: string): Promise<DailyTask> => {
  try {
    const response = await apiClient.post<DailyTask>(`/dailyTask/${taskId}/swap`);
    return response.data;
  } catch (error) {
    // Log API errors to Sentry  
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};