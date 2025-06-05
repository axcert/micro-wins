import axios from 'axios';
import { CreateGoalRequest, Goal, CompleteStepResult, MicroStep } from '@/types/goalTypes';
import { apiClient } from './apiClient';

export const goalService = {
  /**
   * Fetch user's goals
   */
  getUserGoals: async (status = 'active') => {
    return await apiClient.get(`/goals?status=${status}`);
  },

  /**
   * Create a new goal
   */
  createGoal: async (goalData: CreateGoalRequest) => {
    return await apiClient.post('/goals', goalData);
  },

  /**
   * Get goal details with steps
   */
  getGoalDetails: async (goalId: string) => {
    return await apiClient.get(`/goals/${goalId}`);
  },

  /**
   * Complete a step
   */
  completeStep: async (stepId: string) => {
    return await apiClient.post(`/steps/${stepId}/complete`);
  },

  /**
   * Skip a step
   */
  skipStep: async (stepId: string) => {
    return await apiClient.post(`/steps/${stepId}/skip`);
  },

  /**
   * Get today's step
   */
  getTodaysStep: async () => {
    return await apiClient.get('/steps/today');
  },

  /**
   * Pause a goal
   */
  pauseGoal: async (goalId: string) => {
    return await apiClient.post(`/goals/${goalId}/pause`);
  },

  /**
   * Activate a goal
   */
  activateGoal: async (goalId: string) => {
    return await apiClient.post(`/goals/${goalId}/activate`);
  },

  /**
   * Get goal templates
   */
  getGoalTemplates: async () => {
    return await apiClient.get('/goals/templates');
  },

  /**
   * Get goal statistics
   */
  getGoalStats: async (goalId: string) => {
    return await apiClient.get(`/goals/${goalId}/stats`);
  },

  /**
   * Get dashboard summary
   */
  getDashboardSummary: async () => {
    return await apiClient.get('/progress/dashboard');
  }
};