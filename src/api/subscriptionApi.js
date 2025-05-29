import { handleError } from '../utils/errorUtils';
import api from './apiClient';

const SUBSCRIPTION_API_URL = 'https://api.yourapp.com/subscriptions';

export const createSubscription = async (userId, planId) => {
  try {
    const response = await api.post(`${SUBSCRIPTION_API_URL}/create`, { userId, planId });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const updatePaymentMethod = async (userId, paymentMethodId) => {
  try {
    const response = await api.put(`${SUBSCRIPTION_API_URL}/payment-method`, { userId, paymentMethodId });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const cancelSubscription = async (userId) => {
  try {
    const response = await api.delete(`${SUBSCRIPTION_API_URL}/cancel/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fetchSubscriptionStatus = async (userId) => {
  try {
    const response = await api.get(`${SUBSCRIPTION_API_URL}/status/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fetchInvoiceHistory = async (userId) => {
  try {
    const response = await api.get(`${SUBSCRIPTION_API_URL}/invoices/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const resumeSubscription = async (userId) => {
  try {
    const response = await api.post(`${SUBSCRIPTION_API_URL}/resume/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};