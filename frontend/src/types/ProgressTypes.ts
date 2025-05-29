export interface DashboardSummary {
  completedGoals: number;
  activeGoals: number;
  totalTasks: number;
  completedTasks: number;
}

export interface Streak {
  current: number;
  longest: number;
  lastCompletedDate: Date;
}

export interface TimelineData {
  date: Date;
  completedTasks: number;
}

export interface CompletionStats {
  weeklyCompletion: number;
  monthlyCompletion: number;
  communityWeeklyAverage: number;
  communityMonthlyAverage: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  achievedAt: Date;
}