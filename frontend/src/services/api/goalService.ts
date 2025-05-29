// ... existing imports ...
import { Goal, GoalSummary, MicroStep } from '../../types/GoalTypes';

// ... existing functions ...

export const fetchGoalSummary = async (): Promise<GoalSummary> => {
  try {
    const response = await axiosInstance.get('/goals/summary');
    return response.data;
  } catch (err) {
    console.error('Error fetching goal summary:', err);
    throw err;
  }
};

export const fetchTodaysTask = async (): Promise<MicroStep> => {
  try {
    const response = await axiosInstance.get('/goals/todays-task');
    return response.data; 
  } catch (err) {
    console.error('Error fetching today\'s task:', err);
    throw err;
  }
};