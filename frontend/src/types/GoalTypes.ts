export interface GoalData {
  title: string;
  category?: string;
  difficulty: 'easy' | 'medium' | 'hard'; 
  targetDays: number;
}

export interface MicroStep {
  id: string;
  goalId: string;
  order: number;
  title: string; 
  description: string;
  tips: string[];
  completedAt?: Date;
}

export interface GoalStatusResponse {
  status: 'processing' | 'completed';
}

export interface MicroStepsResponse {  
  microSteps: MicroStep[];
}