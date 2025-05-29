import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const PROGRESS_API_URL = 'https://api.yourapp.com/progress';

export const fetchDashboardSummary = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/dashboard/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching dashboard summary');
    return null;
  }
};

export const fetchStreakData = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/streaks/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching streak data');
    return null;
  }
};

export const fetchProgressChartData = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/chart/${userId}?start=${startDate}&end=${endDate}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching progress chart data');
    return null;
  }
};

export const fetchCompletionRate = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/completion-rate/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching completion rate');
    return null;
  }
};

export const fetchTaskHistory = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/task-history/${userId}`); 
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching task history');
    return null;
  }
};

export const exportProgressData = async (userId) => {
  try {    
    const response = await api.get(`${PROGRESS_API_URL}/export/${userId}`, {
      responseType: 'blob',
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error exporting progress data');
    return null;  
  }
};

export const shareProgressImage = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/share-image/${userId}`, {
      responseType: 'blob',  
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error generating progress share image');
    return null;
  }
};