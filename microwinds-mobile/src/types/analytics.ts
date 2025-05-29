// Analytics type definitions
export interface DashboardSummary {
  totalGoals: number;
  activeGoals: number;
  completedGoals: number;
  totalStepsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  averageCompletionRate: number;
  lastUpdated: string;
}

export interface ProgressData {
  date: string;
  completedSteps: number;
  targetSteps: number;
  completionRate: number;
}

export interface GoalProgress {
  goalId: string;
  goalTitle: string;
  category: string;
  progress: number;
  completedSteps: number;
  totalSteps: number;
  startDate: string;
  targetDate: string;
  status: 'active' | 'completed' | 'paused';
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  streakHistory: Array<{
    startDate: string;
    endDate: string;
    days: number;
  }>;
  lastActivityDate: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    data: number[];
    color?: (opacity: number) => string;
    strokeWidth?: number;
  }>;
}

export interface ExportOptions {
  format: 'json' | 'csv' | 'pdf';
  dateRange: {
    startDate: string;
    endDate: string;
  };
  includeCharts: boolean;
}

export interface AnalyticsError {
  message: string;
  code: string;
  timestamp: string;
}

export interface CachedAnalytics {
  data: DashboardSummary | ProgressData[] | GoalProgress[] | null;
  timestamp: string;
  expiresAt: string;
}