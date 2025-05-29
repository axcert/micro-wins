import { handleError } from '../utils/errorUtils';

const ANALYTICS_API_URL = 'https://api.yourapp.com/analytics';

export const fetchDashboardSummary = async (userId) => {
  try {
    const response = await fetch(`${ANALYTICS_API_URL}/dashboard/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const fetchProgressChartData = async (userId, startDate, endDate) => {
  try {
    const response = await fetch(`${ANALYTICS_API_URL}/progress/${userId}?start=${startDate}&end=${endDate}`);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const exportProgressData = async (userId) => {
  try {
    const response = await fetch(`${ANALYTICS_API_URL}/export/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    handleError(error);
    return null;
  }
};