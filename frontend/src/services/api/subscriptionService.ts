import axios from 'axios';
import { API_URL } from '../../constants/config';
import { SubscriptionPlan } from '../../types/SubscriptionTypes';

export const fetchSubscriptionStatus = async (): Promise<'active' | 'inactive' | 'trialing' | 'canceled'> => {
  try {
    const response = await axios.get(`${API_URL}/subscription/status`);
    return response.data.status;
  } catch (err) {
    console.error('Error fetching subscription status:', err);
    throw err;
  }
};

export const createSubscription = async (plan: SubscriptionPlan): Promise<void> => {
  try {
    await axios.post(`${API_URL}/subscription/create`, { plan });
  } catch (err) {
    console.error('Error creating subscription:', err);
    throw err;
  }
};

export const updatePaymentMethod = async (paymentMethodId: string): Promise<void> => {
  try {
    await axios.put(`${API_URL}/subscription/payment-method`, { paymentMethodId });
  } catch (err) {
    console.error('Error updating payment method:', err);
    throw err;
  }
};

export const cancelSubscription = async (): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/subscription/cancel`);
  } catch (err) {
    console.error('Error canceling subscription:', err);
    throw err;
  }
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await axios.get(`${API_URL}/subscription/invoices`);
    return response.data.invoices;
  } catch (err) {
    console.error('Error fetching invoices:', err);
    throw err;
  }
};