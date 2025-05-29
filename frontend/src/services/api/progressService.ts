import axios from 'axios';
import { API_URL } from '../../constants/config';
import { DashboardSummary, Streak, TimelineData, CompletionStats, Achievement } from '../../types/ProgressTypes';

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const response = await axios.get(`${API_URL}/progress/dashboard`);
    return response.data;
  } catch (err) {
    console.error('Error fetching dashboard summary:', err);
    throw err;
  }
};

export const fetchCurrentStreak = async (): Promise<Streak> => {
  try {
    const response = await axios.get(`${API_URL}/progress/streaks`);
    return response.data;  
  } catch (err) {
    console.error('Error fetching current streak:', err);
    throw err;
  }
};

export const fetchProgressTimeline = async (): Promise<TimelineData[]> => {
  try {
    const response = await axios.get(`${API_URL}/progress/timeline`);
    return response.data;
  } catch (err) {
    console.error('Error fetching progress timeline:', err);
    throw err;
  }
};

export const fetchCompletionStats = async (): Promise<CompletionStats> => {
  try {
    const response = await axios.get(`${API_URL}/progress/stats`);
    return response.data;
  } catch (err) {
    console.error('Error fetching completion stats:', err);
    throw err;  
  }
};

export const fetchAchievements = async (): Promise<Achievement[]> => {
  try {
    const response = await axios.get(`${API_URL}/progress/achievements`);
    return response.data;
  } catch (err) {
    console.error('Error fetching achievements:', err);
    throw err;
  }
};

export const exportProgressData = async (): Promise<void> => {
  try {
    await axios.get(`${API_URL}/progress/export`, { responseType: 'blob' });
    // TODO: Handle file download
  } catch (err) {
    console.error('Error exporting progress data:', err);
    throw err;
  }  
};