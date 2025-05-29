import { MicroStepType } from './microStep';

export type GoalCategory = 'social' | 'health' | 'career' | 'learning';
export type DifficultyPreference = 'easy' | 'medium' | 'hard';
export type GoalStatus = 'draft' | 'processing' | 'active' | 'paused' | 'completed' | 'archived';

export interface GoalType {
  id: string;
  userId: string;
  title: string;
  category: GoalCategory;
  targetDays: number;
  difficultyPreference: DifficultyPreference;
  status: GoalStatus;
  currentStep?: MicroStepType;
  microSteps: MicroStepType[];
  progress: number;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  processedAt?: string;
}

export interface CreateGoalRequest {
  title: string;
  category: GoalCategory;
  targetDays?: number;
  difficultyPreference?: DifficultyPreference;
}

export interface GoalDraft {
  title: string;
  category?: GoalCategory;
  targetDays: number;
  difficultyPreference: DifficultyPreference;
  savedAt: string;
}

export interface GeneratedStepsPreview {
  goalId: string;
  steps: MicroStepType[];
  generatedAt: string;
}