export interface MicroStepType {
  id: string;
  goalId: string;
  order: number;
  title: string;
  description: string;
  estimatedMinutes: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completedAt?: string;
  skippedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateMicroStepRequest {
  title?: string;
  description?: string;
  estimatedMinutes?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}