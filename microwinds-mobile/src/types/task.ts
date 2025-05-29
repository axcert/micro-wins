export interface TaskCompletion {
  stepId: string;
  goalId: string;
  completedAt: string;
  timeSpent: number;
  completionType: 'completed' | 'skipped' | 'swapped';
}

export interface TaskTimer {
  startTime: number;
  pausedTime: number;
  totalPausedDuration: number;
  isActive: boolean;
}

export interface SwapTaskRequest {
  stepId: string;
  goalId: string;
  reason?: string;
}

export interface TaskCompletionResponse {
  success: boolean;
  message: string;
  nextStep?: MicroStepType;
  progress: number;
  streak: number;
  celebration?: {
    type: 'milestone' | 'streak' | 'completion';
    message: string;
  };
}