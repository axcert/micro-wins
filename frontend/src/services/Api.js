import * as Sentry from 'sentry-expo';

const BASE_URL = 'https://api.example.com';

export const Api = {
  async completeTask(taskId) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
        method: 'POST',
      });
      return response.json();
    } catch (error) {
      Sentry.Native.captureException(error);
      console.error('Error completing task:', error);
      throw error;
    }
  },
  
  async skipTask(taskId) {
    try {  
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/skip`, {
        method: 'POST', 
      });
      return response.json();
    } catch (error) {
      Sentry.Native.captureException(error);  
      console.error('Error skipping task:', error);
      throw error;
    }
  },

  async getAlternativeTask(goalId) {
    try {
      const response = await fetch(`${BASE_URL}/goals/${goalId}/alternative-task`);
      return response.json();
    } catch (error) {
      Sentry.Native.captureException(error);
      console.error('Error getting alternative task:', error); 
      throw error;
    }
  },
};