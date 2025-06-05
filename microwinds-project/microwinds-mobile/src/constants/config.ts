const Config = {
  API_URL: 'https://api.microwinds.com/api',
  APP_VERSION: '1.0.0',
  ANIMATION_DURATION: 300,
  STORAGE_KEYS: {
    AUTH_TOKEN: 'auth_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_DATA: 'user_data',
    GOALS_CACHE: 'goals_cache',
    DASHBOARD_CACHE: 'dashboard_cache',
  },
  CACHE_DURATION: {
    DASHBOARD: 10 * 60 * 1000, // 10 minutes
    GOALS: 15 * 60 * 1000, // 15 minutes
    STEPS: 5 * 60 * 1000, // 5 minutes
  },
};

export default Config;