export * from './api';
export * from './user';
export * from './navigation';

export type GoalCategory = 'social' | 'health' | 'career' | 'learning' | 'creativity' | 'finance' | 'personal';

export interface Goal {
  id: string;
  title: string;
  category: GoalCategory;
  status: 'active' | 'paused' | 'completed' | 'processing' | 'archived';
  target_days: number;
  difficulty_preference: 'easy' | 'medium' | 'hard';
  currentStep?: MicroStep;
  progress: number;
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export interface MicroStep {
  id: string;
  goal_id: string;
  title: string;
  description: string;
  order: number;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Onboarding {
  title: string;
  description: string;
  image: any;
}

export interface ProgressData {
  date: string;
  stepsCompleted: number;
  goalId: string;
}

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  placeholder?: string;
  testID?: string;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  onSubmitEditing?: () => void;
  ref?: React.RefObject<any>;
  icon?: string;
  showPasswordToggle?: boolean;
}

export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
  name?: string;
  rememberMe?: boolean;
  agreedToTerms?: boolean;
}