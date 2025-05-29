export interface DailyTask {
  id: string;
  goalId: string;
  goalTitle: string;
  stepId: string;
  stepNumber: number;
  title: string;
  description: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedMinutes: number;
  tips?: string[];
  completedAt?: string;
  skippedAt?: string;
  swappedAt?: string;
  status: 'pending' | 'completed' | 'skipped' | 'swapped';
  streakCount: number;
  progressPercentage: number;
  nextStepPreview?: {
    title: string;
    description: string;
  };
}

export interface TaskCompletionRequest {
  stepId: string;
  completedAt: string;
  timeSpent?: number;
  notes?: string;
}

export interface TaskSkipRequest {
  stepId: string;
  skippedAt: string;
  reason?: string;
}

export interface TaskSwapRequest {
  stepId: string;
  swappedAt: string;
  swapReason?: string;
}

export interface TaskActionResponse {
  success: boolean;
  message: string;
  data: {
    task: DailyTask;
    streakUpdate: {
      current: number;
      best: number;
      maintained: boolean;
    };
    progressUpdate: {
      goalProgress: number;
      totalProgress: number;
    };
    nextTask?: DailyTask;
  };
}

export interface TaskSyncQueueItem {
  id: string;
  action: 'complete' | 'skip' | 'swap';
  payload: TaskCompletionRequest | TaskSkipRequest | TaskSwapRequest;
  timestamp: string;
  retryCount: number;
  maxRetries: number;
}

export interface TaskCacheData {
  task: DailyTask;
  timestamp: string;
  expiresAt: string;
}

export interface TaskConflictResolution {
  serverTask: DailyTask;
  localTask: DailyTask;
  resolution: 'use_server' | 'use_local' | 'merge';
  mergedData?: DailyTask;
}