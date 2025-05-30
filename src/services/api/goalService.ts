import api from './api';
import { GoalType, MicroStepType } from '@/types';

const getActiveGoal = async () => {
  return await api.get<GoalType>('/goals/active');
};

const getTodaysStep = async () => {  
  return await api.get<MicroStepType>('/steps/today');
};

export const goalService = {
  getActiveGoal,
  getTodaysStep,
  // ... other goal service methods
};