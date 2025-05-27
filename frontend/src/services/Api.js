const BASE_URL = 'https://api.example.com';

export const Api = {
  async completeTask(taskId) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
      method: 'POST',
    });
    return response.json();
  },
  
  async skipTask(taskId) {
    const response = await fetch(`${BASE_URL}/tasks/${taskId}/skip`, {
      method: 'POST', 
    });
    return response.json();
  },

  async getAlternativeTask(goalId) {
    const response = await fetch(`${BASE_URL}/goals/${goalId}/alternative-task`);
    return response.json();
  },
};