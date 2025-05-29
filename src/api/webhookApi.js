import { handleError } from '../utils/errorUtils';
import api from './apiClient';

const WEBHOOK_API_URL = 'https://api.yourapp.com/webhook';

export const handleStripeWebhook = async (event) => {
  try {
    const response = await api.post(`${WEBHOOK_API_URL}/stripe`, event);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};