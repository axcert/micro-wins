import axios from 'axios';
import { API_URL } from '../../constants/config';
import { MicroStep } from '../../types/GoalTypes';

export const fetchGoalSteps = async (goalId: string): Promise<MicroStep[]> => {
  try {
    const response = await axios.get(`${API_URL}/goals/${goalId}/steps`);
    return response.data.steps;
  } catch (err) {
    console.error(`Error fetching steps for goal ${goalId}:`, err);
    throw err;
  }
};

export const fetchTodayStep = async (): Promise<MicroStep> => {
  try {
    const response = await axios.get(`${API_URL}/steps/today`);
    return response.data.step;
  } catch (err) {
    console.error('Error fetching today\'s step:', err);
    throw err;
  }
};

export const completeStep = async (stepId: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/steps/${stepId}/complete`);
  } catch (err) {
    console.error(`Error marking step ${stepId} as complete:`, err);
    throw err;
  }
};

export const skipStep = async (stepId: string, reason: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/steps/${stepId}/skip`, { reason });
  } catch (err) {
    console.error(`Error skipping step ${stepId}:`, err);
    throw err;
  }
};

export const swapStep = async (stepId: string): Promise<MicroStep> => {
  try {
    const response = await axios.post(`${API_URL}/steps/${stepId}/swap`);
    return response.data.step;
  } catch (err) {
    console.error(`Error swapping step ${stepId}:`, err);
    throw err;
  }
};

export const updateStep = async (stepId: string, updatedStep: Partial<MicroStep>): Promise<void> => {
  try {
    await axios.put(`${API_URL}/steps/${stepId}`, updatedStep);
  } catch (err) {
    console.error(`Error updating step ${stepId}:`, err);
    throw err;
  }
};

export const fetchStepHistory = async (stepId: string): Promise<MicroStep[]> => {
  try {
    const response = await axios.get(`${API_URL}/steps/${stepId}/history`);
    return response.data.history;
  } catch (err) {
    console.error(`Error fetching history for step ${stepId}:`, err);
    throw err;
  }
};