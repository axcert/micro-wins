export interface GoalType {
  id: string;
  title: string;
  category: string;
  targetDays: number;
  currentStep: MicroStepType;
  totalSteps: number;
  completedSteps: number;
  progress: number;
  dayStreak: number;
}

export interface MicroStepType {
  id: string;
  title: string;
  description: string;
  stepNumber: number;
}

// ... other type definitions