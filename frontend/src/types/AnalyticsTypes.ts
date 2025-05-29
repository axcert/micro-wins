export interface AnalyticsSummary {
  totalGoals: number;
  completedGoals: number;
  totalTasks: number;
  completedTasks: number;
  currentStreak: number;
  bestStreak: number;
}

export interface CalendarHeatmapData {
  [date: string]: number;
}

export interface StreakStats {
  currentStreak: number;
  bestStreak: number;
  totalDaysTracked: number;
}

export interface CompletionRate {
  daily: number;
  weekly: number;
  monthly: number;
  allTime: number;
}