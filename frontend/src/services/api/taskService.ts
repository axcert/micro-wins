import axios from 'axios';
import { API_URL } from '../../constants/config';
import { TaskType } from '../../types/TaskTypes';

export const fetchTodaysTask = async (): Promise<TaskType> => {
  try {
    const response = await axios.get(`${API_URL}/tasks/today`);
    return response.data;
  } catch (err) {
    console.error('Error fetching today\'s task:', err);
    throw err;
  }
};

export const completeTask = async (taskId: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/tasks/${taskId}/complete`);
  } catch (err) {
    console.error('Error completing task:', err);
    throw err;
  }
};

export const skipTask = async (taskId: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/tasks/${taskId}/skip`); 
  } catch (err) {
    console.error('Error skipping task:', err);
    throw err;
  }
};

export const swapTask = async (taskId: string): Promise<TaskType> => {
  try {
    const response = await axios.post(`${API_URL}/tasks/${taskId}/swap`);
    return response.data;
  } catch (err) {
    console.error('Error swapping task:', err);
    throw err;
  }
};