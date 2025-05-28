const BASE_URL = 'https://api.example.com';

export const Api = {
  async completeTask(taskId) {
    const response = await fetch(`${BASE_URL}/steps/${taskId}/complete`, {
      method: 'POST',
    });
    return response.json();
  },
  
  async skipTask(taskId, reason) {
    const response = await fetch(`${BASE_URL}/steps/${taskId}/skip`, {
      method: 'POST',
      body: JSON.stringify({ reason }), 
      headers: {
        'Content-Type': 'application/json',
      }, 
    });
    return response.json();
  },

  async swapTask(taskId, alternativeStep) {
    const response = await fetch(`${BASE_URL}/steps/${taskId}/swap`, {
      method: 'POST',
      body: JSON.stringify({ alternativeStep }),
      headers: {
        'Content-Type': 'application/json',
      },
    });  
    return response.json();
  },

  async updateTask(taskId, updates) {
    const response = await fetch(`${BASE_URL}/steps/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  },

  async getTaskHistory(taskId) {
    const response = await fetch(`${BASE_URL}/steps/${taskId}/history`);
    return response.json();
  },
};