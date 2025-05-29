import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled';
  startDate: string;
  endDate: string;
}

export const fetchSubscription = async (dispatch: AppDispatch): Promise<Subscription | null> => {
  try {
    const response = await apiClient.get<Subscription>('/subscriptions');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      // Handle unauthorized
    } else {
      dispatch(setOfflineMode(true));
    }
    return null;
  }
};

export const createSubscription = async (token: string): Promise<Subscription> => {
  try {
    const response = await apiClient.post<Subscription>('/subscriptions', { token });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const restoreSubscription = async (): Promise<Subscription> => {
  try {
    const response = await apiClient.post<Subscription>('/subscriptions/restore');
    return response.data;
  } catch (error) {
    return Promise.reject(error);  
  }
};