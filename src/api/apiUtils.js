import axios from 'axios';
import { handleError } from '../utils/errorUtils';
// ... existing imports

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  config => {
    const token = getAuthToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;  
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    handleError(error, () => {
      // Retry logic for idempotent requests
      const config = error.config;
      config.__retryCount = config.__retryCount || 0;

      if (config.__retryCount < 3) {
        config.__retryCount += 1;
        return new Promise(resolve => {
          setTimeout(() => resolve(api(config)), 1000);
        });
      }
    });
    return Promise.reject(error);
  }
);

// ... existing api methods