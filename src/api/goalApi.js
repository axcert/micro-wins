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

export const fetchUserGoals = async (userId, page, limit) => {
  try {
    const response = await api.get(`${GOAL_API_URL}/user/${userId}?page=${page}&limit=${limit}`); 
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching user goals');
    return null;
  }
};

export const fetchGoalDetails = async (goalId) => {
  try {
    const response = await api.get(`${GOAL_API_URL}/${goalId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching goal details');
    return null;
  }
};

export const updateGoalStatus = async (goalId, status) => {
  try {
    const response = await api.put(`${GOAL_API_URL}/${goalId}/status`, { status });
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating goal status');
    return null;
  }
};

export const deleteGoal = async (goalId) => {
  try {
    const response = await api.delete(`${GOAL_API_URL}/${goalId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error deleting goal');
    return null;
  }
};

export const fetchGoalTemplates = async () => {
  try {
    const response = await api.get(`${GOAL_API_URL}/templates`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching goal templates'); 
    return null;
  }
};

export const fetchGoalsByCategory = async (category) => {
  try {
    const response = await api.get(`${GOAL_API_URL}/category/${category}`);
    return response.data; 
  } catch (error) {
    handleError(error, 'Error fetching goals by category');
    return null;
  }
};