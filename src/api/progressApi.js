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

export const fetchProgressTimeline = async (userId, startDate, endDate) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/timeline/${userId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching progress timeline');
    return null;
  }
};

export const fetchProgressStats = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/stats/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching progress stats');
    return null;
  }
};

export const fetchAchievements = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/achievements/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching achievements');
    return null;
  }
};

export const exportProgressData = async (userId) => {
  try {
    const response = await api.get(`${PROGRESS_API_URL}/export/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error exporting progress data');
    return null;
  }
};