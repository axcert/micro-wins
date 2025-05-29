import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';
import * as Sentry from '@sentry/react-native';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: string;
  targetDays: number;
  createdAt: string;
  updatedAt: string;
  status: 'processing' | 'active' | 'completed';
}

export interface GoalInput {
  title: string;
  category: string;
  targetDays: number;  
}

export const createGoal = async (goal: GoalInput): Promise<Goal> => {
  try {
    const response = await apiClient.post<Goal>('/goals', goal);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response?.status === 401) {
      Sentry.captureException(error);
      return Promise.reject(new Error('Authentication error'));
    }

    if (!axiosError.response) {
      Sentry.captureException(error);
      return Promise.reject(new Error('Network error'));
    }
    
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const fetchGoal = async (goalId: string, dispatch: AppDispatch): Promise<Goal | null> => {
  try {
    const response = await apiClient.get<Goal>(`/goals/${goalId}`);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true)); 
      return null;
    }

    if (!axiosError.response) {
      dispatch(setOfflineMode(true));
      return null; 
    }
    
    // Log API errors to Sentry
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};