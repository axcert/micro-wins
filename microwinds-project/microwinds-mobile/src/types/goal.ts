export type GoalCategory = 'social' | 'health' | 'career' | 'learning';
export type DifficultyPreference = 'easy' | 'medium' | 'hard';
export type GoalStatus = 'draft' | 'processing' | 'active' | 'paused' | 'completed' | 'archived';

export interface MicroStepType {
  id: string;
  goalId: string;
  title: string;
  description: string;
  order: number;
  completedAt: string | null;
  tips: string[];
  isCurrentStep: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GoalType {
  id: string;
  userId: string;
  title: string;
  category: GoalCategory;
  status: GoalStatus;
  targetDays: number;
  difficultyPreference: DifficultyPreference;
  currentDay: number;
  startedAt: string | null;
  completedAt: string | null;
  processedAt: string | null;
  microSteps?: MicroStepType[];
  currentStep?: MicroStepType;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGoalRequest {
  title: string;
  category: GoalCategory;
  targetDays?: number;
  difficultyPreference?: DifficultyPreference;
}

export interface GoalDraft extends CreateGoalRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface StepEditData {
  title: string;
  description: string;
  tips: string[];
}

export interface GoalProcessingState {
  goalId: string;
  status: 'queued' | 'processing' | 'complete' | 'error';
  progress: number;
  message: string;
  steps?: MicroStepType[];
  error?: string;
}

export interface GoalTemplate {
  id: string;
  title: string;
  category: GoalCategory;
  description: string;
  exampleSteps: string[];
  difficulty: DifficultyPreference;
  popularity: number;
}