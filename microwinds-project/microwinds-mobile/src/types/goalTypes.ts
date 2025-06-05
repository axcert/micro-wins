export type GoalCategory = 'social' | 'health' | 'career' | 'learning' | 'creativity' | 'finance' | 'personal';

export type GoalStatus = 'active' | 'paused' | 'completed' | 'archived' | 'processing';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface MicroStep {
  id: string;
  goalId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  difficulty: DifficultyLevel;
  completedAt: string | null;
  tips?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: GoalCategory;
  status: GoalStatus;
  targetDays: number;
  difficultyPreference: DifficultyLevel;
  progress: number;
  streakCount: number;
  longestStreak: number;
  startDate: string;
  completedAt: string | null;
  processedAt: string | null;
  currentStep: MicroStep | null;
  microSteps?: MicroStep[];
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  goalId: string;
  userId: string;
  stepsCompleted: number;
  totalSteps: number;
  progress: number;
  streakCount: number;
  longestStreak: number;
  lastCompletedAt: string | null;
}

export interface GoalStats {
  completedSteps: number;
  remainingSteps: number;
  daysLeft: number;
  completionRate: number;
  averageTimePerStep: number;
}

export interface CreateGoalRequest {
  title: string;
  category: GoalCategory;
  targetDays?: number;
  difficultyPreference?: DifficultyLevel;
}

export interface CompleteStepResult {
  stepId: string;
  goalId: string;
  progress: number;
  nextStep: MicroStep | null;
  streakCount: number;
}