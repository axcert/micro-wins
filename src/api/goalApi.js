import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const GOAL_API_URL = 'https://api.yourapp.com/goals';

export const createGoal = async (goal) => {
  try {
    const response = await api.post(`${GOAL_API_URL}`, goal);
    return response.data;
  } catch (error) {
    handleError(error, 'Error creating goal');
    return null;
  }
};

export const fetchGoalStatus = async (goalId) => {
  try {
    const response = await api.get(`${GOAL_API_URL}/${goalId}/status`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching goal status');
    return null;
  }
};

export const fetchGoalSteps = async (goalId) => {
  try {
    const response = await api.get(`${GOAL_API_URL}/${goalId}/steps`); 
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching goal steps');
    return null;
  }
};

export const requestGoalDecomposition = async (goalId) => {
  try {
    const response = await api.post(`${GOAL_API_URL}/${goalId}/decompose`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error requesting goal decomposition');
    return null;
  }
};

export const overrideGoalSteps = async (goalId, steps) => {
  try {
    const response = await api.put(`${GOAL_API_URL}/${goalId}/steps`, { steps });
    return response.data;
  } catch (error) {
    handleError(error, 'Error overriding goal steps');
    return null;
  }
};