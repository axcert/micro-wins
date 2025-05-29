import { AxiosError } from 'axios';
import { apiClient } from './apiClient';
import { AppDispatch } from '../../store';
import { setOfflineMode } from '../../store/slices/appSlice';
import * as Sentry from '@sentry/react-native';

export interface Subscription {
  id: string;
  userId: string;
  status: 'active' | 'trialing' | 'past_due' | 'canceled';
  startDate: string;
  endDate: string;
  plan: string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'paid' | 'unpaid';
  invoicePdf: string;
}

export const createSubscription = async (dispatch: AppDispatch, paymentMethodId: string, plan: string): Promise<Subscription> => {
  try {
    const response = await apiClient.post<Subscription>('/subscriptions', { paymentMethodId, plan });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return Promise.reject(new Error('Unauthorized'));
    }
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const updatePaymentMethod = async (dispatch: AppDispatch, paymentMethodId: string): Promise<void> => {
  try {
    await apiClient.put('/subscriptions/payment-method', { paymentMethodId });
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return Promise.reject(new Error('Unauthorized'));
    }
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};

export const cancelSubscription = async (dispatch: AppDispatch): Promise<void> => {
  try {
    await apiClient.delete('/subscriptions');
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return Promise.reject(new Error('Unauthorized'));
    }
    Sentry.captureException(error);
    return Promise.reject(error);  
  }
};

export const fetchSubscriptionStatus = async (dispatch: AppDispatch): Promise<Subscription | null> => {
  try {
    const response = await apiClient.get<Subscription>('/subscriptions');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return null;
    }
    Sentry.captureException(error);
    return null;
  }
};

export const fetchInvoices = async (dispatch: AppDispatch): Promise<Invoice[]> => {
  try {
    const response = await apiClient.get<Invoice[]>('/subscriptions/invoices');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return [];
    }
    Sentry.captureException(error);
    return [];
  }
};

export const resumeSubscription = async (dispatch: AppDispatch): Promise<Subscription> => {
  try {
    const response = await apiClient.post<Subscription>('/subscriptions/resume');
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      dispatch(setOfflineMode(true));
      return Promise.reject(new Error('Unauthorized'));  
    }
    Sentry.captureException(error);
    return Promise.reject(error);
  }
};