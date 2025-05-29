import axios from 'axios';
import { API_URL } from '../../constants/config';
import { AnalyticsSummary, CalendarHeatmapData, StreakStats, CompletionRate } from '../../types/AnalyticsTypes';

export const fetchAnalyticsSummary = async (): Promise<AnalyticsSummary> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/summary`);
    return response.data;
  } catch (err) {
    console.error('Error fetching analytics summary:', err);
    throw err;
  }
};

export const fetchCalendarHeatmap = async (): Promise<CalendarHeatmapData> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/heatmap`);
    return response.data;
  } catch (err) {
    console.error('Error fetching calendar heatmap data:', err);
    throw err;
  }
};

export const fetchStreakStats = async (): Promise<StreakStats> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/streaks`);
    return response.data;
  } catch (err) {
    console.error('Error fetching streak stats:', err);
    throw err;
  }
};

export const fetchCompletionRate = async (): Promise<CompletionRate> => {
  try {
    const response = await axios.get(`${API_URL}/analytics/completion-rate`);
    return response.data;
  } catch (err) {
    console.error('Error fetching completion rate:', err);
    throw err;
  }
};