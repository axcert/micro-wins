export type GoalCategory = 'social' | 'health' | 'career' | 'learning' | 'creativity' | 'finance' | 'personal';
export type DifficultyPreference = 'easy' | 'medium' | 'hard';
export type GoalStatus = 'draft' | 'processing' | 'active' | 'paused' | 'completed' | 'archived';

export interface CreateGoalRequest {
  title: string;
  category: GoalCategory;
  targetDays?: number;
  difficultyPreference?: DifficultyPreference;
}

export interface GoalType {
  id: string;
  userId: string;
  title: string;
  category: GoalCategory;
  targetDays: number;
  difficultyPreference: DifficultyPreference;
  status: GoalStatus;
  currentStep?: MicroStepType;
  progress: number;
  streakCount: number;
  createdAt: string;
  updatedAt: string;
  processedAt?: string;
  completedAt?: string;
}

export interface MicroStepType {
  id: string;
  goalId: string;
  title: string;
  description: string;
  order: number;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  tips?: string[];
  resources?: string[];
  completedAt?: string;
  skippedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GoalProcessingStatus {
  goalId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  progress?: number;
  message?: string;
  error?: string;
  completedAt?: string;
}

export interface GoalWithSteps extends GoalType {
  microSteps: MicroStepType[];
  totalSteps: number;
  completedSteps: number;
  nextStep?: MicroStepType;
}