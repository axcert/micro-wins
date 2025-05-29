import axios from 'axios';
import { API_URL } from '../../constants/config';
import { GoalData, MicroStep } from '../../types/GoalTypes';

export const createGoal = async (goalData: GoalData): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/goals`, goalData);
    return response.data.goalId;
  } catch (err) {
    console.error('Error creating goal:', err);
    throw err;
  }
};

export const fetchGoalStatus = async (goalId: string): Promise<'processing' | 'completed'> => {
  try {
    const response = await axios.get(`${API_URL}/goals/${goalId}/status`);
    return response.data.status;
  } catch (err) {
    console.error(`Error fetching status for goal ${goalId}:`, err);
    throw err;
  }
};

export const fetchGoalMicroSteps = async (goalId: string): Promise<MicroStep[]> => {
  try {
    const response = await axios.get(`${API_URL}/goals/${goalId}/microsteps`);
    return response.data.microSteps;
  } catch (err) {
    console.error(`Error fetching micro-steps for goal ${goalId}:`, err);
    throw err;
  }
};

export const overrideGoalMicroSteps = async (goalId: string, updatedSteps: MicroStep[]): Promise<void> => {
  try {
    await axios.put(`${API_URL}/goals/${goalId}/microsteps`, { steps: updatedSteps });
  } catch (err) {
    console.error(`Error overriding micro-steps for goal ${goalId}:`, err);
    throw err;  
  }
};