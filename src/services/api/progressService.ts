import { axiosInstance } from './axiosInstance';

const ENDPOINTS = {
  GET_PROGRESS_DATA: '/api/progress/dashboard',
};

export const progressService = {
  async getProgressData() {
    return axiosInstance.get(ENDPOINTS.GET_PROGRESS_DATA);
  },
};