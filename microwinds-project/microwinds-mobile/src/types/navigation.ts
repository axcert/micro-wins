import { NavigatorScreenParams } from '@react-navigation/native';
import { GoalType, MicroStepType } from './goal';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Onboarding: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  CreateGoal: undefined;
  EditGoal: { goalId: string };
  GoalDetails: { goalId: string };
  Task: { stepId: string; goalId: string };
  StepPreview: { goalId: string };
  EditStep: { stepId: string; goalId: string };
  Celebration: { type: 'step' | 'goal'; goalId: string };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string; email: string };
};

export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type GoalCreationStackParamList = {
  GoalInput: undefined;
  CategorySelection: { goalDraft: Partial<GoalType> };
  DifficultySelection: { goalDraft: Partial<GoalType> };
  Processing: { goalDraft: Partial<GoalType> };
  StepsPreview: { goal: GoalType };
  StepEdit: { step: MicroStepType; index: number };
  Confirmation: { goal: GoalType };
};