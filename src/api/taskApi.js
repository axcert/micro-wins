import { handleError } from '../utils/errorUtils';
import { getAuthToken } from '../utils/authUtils';
import { showCelebrationAnimation } from '../utils/animations';
import api from './apiUtils';

const TASK_API_URL = 'https://api.yourapp.com/tasks';

export const fetchTodaysTask = async (userId) => {
  try {
    const response = await api.get(`${TASK_API_URL}/today/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const completeTask = async (userId, taskId) => {
  try {
    const response = await api.post(`${TASK_API_URL}/${taskId}/complete`, { userId });
    if (response.status === 200) {
      showCelebrationAnimation();
    }
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const skipTask = async (userId, taskId) => {
  try {
    const response = await api.post(`${TASK_API_URL}/${taskId}/skip`, { userId });
    return response.data;
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const swapTask = async (userId, taskId) => {
  try {
    const response = await api.post(`${TASK_API_URL}/${taskId}/swap`, { userId });
    return response.data; 
  } catch (error) {
    handleError(error);
    return null;
  }
};

export const syncTaskChanges = async (changes) => {
  try {
    const response = await api.post(`${TASK_API_URL}/sync`, changes);
    return response.data;
  } catch (error) {
    // Queue changes offline
    await queueOfflineChanges(changes);
    handleError(error);
    return null;
  }
};

const queueOfflineChanges = async (changes) => {
  try {
    const existingQueue = await AsyncStorage.getItem('taskChangeQueue');
    const queue = existingQueue ? JSON.parse(existingQueue) : [];
    queue.push(...changes);
    await AsyncStorage.setItem('taskChangeQueue', JSON.stringify(queue));
  } catch (error) {
    console.error('Error queueing offline task changes:', error);
  }
};