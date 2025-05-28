const BASE_URL = 'https://api.example.com';

export const Api = {
  async login(email, password) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async register(email, password) {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),  
    });
    return response.json();
  },

  async logout() {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
    });
  },

  async completeTask(taskId) {
    // ...
  },
  
  async skipTask(taskId) {  
    // ...
  },

  async getAlternativeTask(goalId) {
    // ...
  },
};