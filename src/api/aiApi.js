import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const AI_API_URL = 'https://api.yourapp.com/ai';

export const fetchAIProviders = async () => {
  try {
    const response = await api.get(`${AI_API_URL}/providers`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching AI providers');
    return null;
  }
};

export const fetchAIUsageCosts = async (providerId) => {
  try {
    const response = await api.get(`${AI_API_URL}/usage-costs/${providerId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching AI usage costs');
    return null;
  }
};

export const cacheGoalDecomposition = async (goal, steps) => {
  try {
    const response = await api.post(`${AI_API_URL}/cache-decomposition`, { goal, steps });
    return response.data;
  } catch (error) {
    handleError(error, 'Error caching goal decomposition');
    return null;
  }
};