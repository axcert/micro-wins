import axios from 'axios';
import { API_URL } from '../../constants/config';

export const fetchAnalyticsSummary = async () => {
  try {
    const response = await axios.get(`${API_URL}/analytics/summary`);
    return response.data;
  } catch (err) {
    console.error('Error fetching analytics summary:', err);
    throw err;
  }
};