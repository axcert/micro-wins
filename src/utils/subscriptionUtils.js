import { handleError } from './errorUtils';
import api from '../api/apiClient';

const SUBSCRIPTION_API_URL = 'https://api.yourapp.com/subscriptions';

export const upgradePlan = async (userId, newPlanId) => {
  try {
    const response = await api.post(`${SUBSCRIPTION_API_URL}/upgrade`, { userId, planId: newPlanId });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const downgradePlan = async (userId, newPlanId) => {
  try {
    const response = await api.post(`${SUBSCRIPTION_API_URL}/downgrade`, { userId, planId: newPlanId });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;  
  }
};

export const manageTrial = async (userId, action) => {
  try {
    const response = await api.post(`${SUBSCRIPTION_API_URL}/trial`, { userId, action });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};