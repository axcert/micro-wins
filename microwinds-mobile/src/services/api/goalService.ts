```ts
import { CreateGoalRequest, Goal } from '@/types';
import axiosInstance from '@/services/api';

export async function createGoal(data: CreateGoalRequest): Promise<Goal> {
  const response = await axiosInstance.post<Goal>('/goals', data);
  return response.data;
}

export async function getUserGoals(): Promise<Goal[]> {
  const response = await axiosInstance.get<Goal[]>('/goals');
  return response.data;
}

export async function getGoalById(goalId: string): Promise<Goal> {
  const response = await axiosInstance.get<Goal>(`/goals/${goalId}`);
  return response.data;
}

export async function updateGoal(
  goalId: string, 
  data: Partial<Goal>
): Promise<Goal> {
  const response = await axiosInstance.put<Goal>(`/goals/${goalId}`, data);
  return response.data;
}

export async function deleteGoal(goalId: string): Promise<void> {
  await axiosInstance.delete(`/goals/${goalId}`);
}
```