import axiosInstance from './axiosInstance';
import { Goal, GoalRequest, MicroStep } from '@/types';

export const createGoal = async (goalData: GoalRequest): Promise<Goal> => {
  const response = await axiosInstance.post<Goal>('/goals', goalData);
  return response.data;
};

export const getGoalWithSteps = async (goalId: number): Promise<Goal> => {
  const response = await axiosInstance.get<Goal>(`/goals/${goalId}`);
  return response.data;
};

export const updateGoalSteps = async (goalId: number, steps: MicroStep[]): Promise<Goal> => {
  const response = await axiosInstance.put<Goal>(`/goals/${goalId}/steps`, { steps });
  return response.data;
};