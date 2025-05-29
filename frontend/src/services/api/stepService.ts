import api from './api';
import { MicroStep } from '../../types/GoalTypes';

export const markStepCompleted = async (stepId: string): Promise<void> => {
  try {
    await api.put(`/steps/${stepId}/complete`);
  } catch (error) {
    console.error('Failed to mark step as completed', error);
    throw error;
  }
};

export const swapStep = async (stepId: string): Promise<MicroStep> => {
  try {
    const response = await api.put<MicroStep>(`/steps/${stepId}/swap`);
    return response.data;
  } catch (error) {
    console.error('Failed to swap step', error);
    throw error;
  }
};