```ts
import { UserState } from '@/store/slices/authSlice';

export type RootStackParamList = {
  // Auth
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };

  // App
  Home: undefined;
  Goals: undefined;
  Analytics: undefined;
  Settings: undefined;

  // Goal Management
  GoalPreview: { goalId: string };
  CreateGoal: undefined;
  EditGoal: { goal: Goal };
};

export type RootState = {
  auth: UserState;
  goals: GoalState;
};

export type Goal = {
  id: string;
  userId: string;
  title: string;
  category: 'social' | 'health' | 'career' | 'learning';
  targetDays: number;
  difficultyPreference: 'easy' | 'medium' | 'hard';
  status: 'processing' | 'active' | 'paused' | 'completed';
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type MicroStep = {
  id: string;
  goalId: string;
  title: string;
  description: string;
  order: number;
  status: 'active' | 'completed' | 'skipped';
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export interface CreateGoalRequest {
  title: string;
  category: 'social' | 'health' | 'career' | 'learning';
  targetDays?: number;
  difficultyPreference?: 'easy' | 'medium' | 'hard';
}

export interface GoalState {
  goals: Goal[];
  activeGoal: Goal | null;
  microSteps: MicroStep[];
  loading: boolean;
  error: string | null;
}
```