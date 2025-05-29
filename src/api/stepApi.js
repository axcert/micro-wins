import api from './apiUtils';
import { handleError } from '../utils/errorUtils';

const STEP_API_URL = 'https://api.yourapp.com/steps';

export const fetchStepsForGoal = async (goalId) => {
  try {
    const response = await api.get(`${STEP_API_URL}/goal/${goalId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching steps for goal');
    return null;
  }
};

export const fetchTodaysStep = async (userId) => {
  try {
    const response = await api.get(`${STEP_API_URL}/today/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching today\'s step');
    return null;
  }
};

export const completeStep = async (stepId) => {
  try {
    const response = await api.post(`${STEP_API_URL}/${stepId}/complete`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error completing step');
    return null;
  }
};

export const skipStep = async (stepId, reason) => {
  try {
    const response = await api.post(`${STEP_API_URL}/${stepId}/skip`, { reason });
    return response.data;
  } catch (error) {
    handleError(error, 'Error skipping step');
    return null;
  }
};

export const swapStep = async (stepId) => {
  try {
    const response = await api.post(`${STEP_API_URL}/${stepId}/swap`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error swapping step');
    return null;
  }
};

export const updateStep = async (stepId, updatedStep) => {
  try {
    const response = await api.put(`${STEP_API_URL}/${stepId}`, updatedStep);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating step');
    return null;
  }
};

export const fetchStepHistory = async (stepId) => {
  try {
    const response = await api.get(`${STEP_API_URL}/${stepId}/history`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching step history');
    return null;
  }
};