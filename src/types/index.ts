export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Goal {
  id: number;
  userId: number;
  title: string;
  category: string;
  targetDays: number;
  difficultyPreference: string;
  status: 'draft' | 'active' | 'completed';
  microSteps: MicroStep[];
  createdAt: string;
  updatedAt: string;
}

export interface MicroStep {
  id: number;
  goalId: number;
  title: string;
  completed: boolean;
  order: number;
}

export interface GoalRequest {
  title: string;
  category: string;
  targetDays?: number;
  difficultyPreference?: string;
}