import { NavigationProp, RouteProp } from '@react-navigation/native';

export type AuthStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string };
};

export type OnboardingStackParamList = {
  Onboarding: undefined;
  Step1: undefined;
  Step2: undefined;
  Step3: undefined;
};

export type MainStackParamList = {
  MainTabs: undefined;
  CreateGoal: undefined;
  GoalDetail: { goalId: string };
  Task: { stepId: string };
  Progress: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Progress: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Onboarding: undefined;
  Main: undefined;
};

// Navigation Props
export type AuthScreenNavigationProp = NavigationProp<AuthStackParamList>;
export type OnboardingScreenNavigationProp = NavigationProp<OnboardingStackParamList>;
export type MainScreenNavigationProp = NavigationProp<MainStackParamList>;
export type MainTabScreenNavigationProp = NavigationProp<MainTabParamList>;
export type RootScreenNavigationProp = NavigationProp<RootStackParamList>;

// Route Props
export type AuthScreenRouteProp<T extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, T>;
export type OnboardingScreenRouteProp<T extends keyof OnboardingStackParamList> = RouteProp<OnboardingStackParamList, T>;
export type MainScreenRouteProp<T extends keyof MainStackParamList> = RouteProp<MainStackParamList, T>;
export type MainTabScreenRouteProp<T extends keyof MainTabParamList> = RouteProp<MainTabParamList, T>;