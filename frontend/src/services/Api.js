const BASE_URL = 'https://api.example.com';

export const Api = {
  // ... existing API methods ...
  
  async getDashboardSummary() {
    const response = await fetch(`${BASE_URL}/api/progress/dashboard`);
    return response.json();
  },
  
  async getStreakData() {
    const response = await fetch(`${BASE_URL}/api/progress/streaks`);
    return response.json();  
  },
  
  async getProgressTimeline() {
    const response = await fetch(`${BASE_URL}/api/progress/timeline`);
    return response.json();
  },
  
  async getCompletionStats() {
    const response = await fetch(`${BASE_URL}/api/progress/stats`);  
    return response.json();
  },
  
  async getAchievements() {
    const response = await fetch(`${BASE_URL}/api/progress/achievements`);
    return response.json();
  },
  
  async exportUserData() {
    const response = await fetch(`${BASE_URL}/api/progress/export`);
    return response.json();  
  },
};