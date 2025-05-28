const BASE_URL = 'https://api.example.com';

export const Api = {
  async completeTask(taskId) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/complete`, {
        method: 'POST',
      });
      return await response.json();
    } catch (err) {
      console.error('Error completing task:', err);
      throw err;
    }
  },
  
  async skipTask(taskId) {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${taskId}/skip`, {
        method: 'POST', 
      });
      return await response.json();
    } catch (err) {
      console.error('Error skipping task:', err);
      throw err;  
    }
  },

  async swapTask(goalId) {
    try {
      const response = await fetch(`${BASE_URL}/goals/${goalId}/swap-task`, {
        method: 'POST',
      });
      return await response.json();
    } catch (err) {
      console.error('Error swapping task:', err);
      throw err;
    }
  },
  
  async syncOfflineActions(actions) {
    try {
      const response = await fetch(`${BASE_URL}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(actions),
      });
      return await response.json();
    } catch (err) {
      console.error('Error syncing offline actions:', err);
      throw err;
    }
  },

};