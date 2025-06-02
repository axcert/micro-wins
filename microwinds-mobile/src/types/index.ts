// Add these type definitions

export interface GoalType {
  id: string;
  userId: string;
  title: string;
  category: string;
  status: 'active' | 'paused' | 'completed';
  totalSteps: number;
  completedSteps: number;
  progress: number;
  streak: number;
  daysRemaining: number;
  createdAt: string;
  updatedAt: string;
}

export interface MicroStepType {
  id: string;
  goalId: string;
  title: string;
  description: string;
  order: number;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string; 
}