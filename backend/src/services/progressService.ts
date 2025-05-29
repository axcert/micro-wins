import prisma from '../config/prisma';

export interface DashboardSummary {
  totalGoals: number;
  activeGoals: number;
  completionRate: number; 
  currentStreak: number;
  longestStreak: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCompletedDate: Date;
}

export interface ProgressTimeline {
  date: Date;
  value: number;
}

export interface StatisticsSummary {
  weeklyAverage: number;
  monthlyAverage: number;
  categoryBreakdown: Record<string, number>;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  completedAt: Date;
}

export const getDashboardSummary = async (userId: string): Promise<DashboardSummary> => {
  const [totalGoals, activeGoals, completedGoals] = await Promise.all([
    prisma.goal.count({ where: { userId } }),
    prisma.goal.count({ where: { userId, status: 'ACTIVE' } }),
    prisma.microStep.count({ where: { goal: { userId }, completedAt: { not: null } } }),
  ]);

  const totalSteps = await prisma.microStep.count({ where: { goal: { userId } } });
  const completionRate = totalSteps > 0 ? Math.round((completedGoals / totalSteps) * 100) : 0;
  
  const streakData = await calculateStreaks(userId);

  return {
    totalGoals,
    activeGoals,
    completionRate,
    currentStreak: streakData.currentStreak,
    longestStreak: streakData.longestStreak,
  };
};

export const getStreaks = async (userId: string): Promise<StreakData> => {
  return calculateStreaks(userId);
};

export const getProgressTimeline = async (userId: string): Promise<ProgressTimeline[]> => {
  const completedSteps = await prisma.microStep.findMany({
    where: { goal: { userId }, completedAt: { not: null } },
    select: { completedAt: true },
  });

  const timeline: ProgressTimeline[] = [];
  let cumulativeValue = 0;

  for (const step of completedSteps) {
    cumulativeValue++;
    timeline.push({
      date: step.completedAt,
      value: cumulativeValue,
    });
  }

  return timeline;
};

export const getStatistics = async (userId: string): Promise<StatisticsSummary> => {
  const weeklyAverage = await calculateWeeklyAverage(userId);
  const monthlyAverage = await calculateMonthlyAverage(userId);
  const categoryBreakdown = await calculateCategoryBreakdown(userId);

  return {
    weeklyAverage,
    monthlyAverage, 
    categoryBreakdown,
  };
};

export const getAchievements = async (userId: string): Promise<Achievement[]> => {
  // TODO: Implement achievement calculation logic
  return [];
};

export const exportProgressData = async (userId: string, format: string): Promise<string> => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const goals = await prisma.goal.findMany({ where: { userId } });
  const microSteps = await prisma.microStep.findMany({ where: { goal: { userId } } });
  
  let exportedData = '';
  
  if (format === 'json') {
    exportedData = JSON.stringify({ user, goals, microSteps }, null, 2);
  } else if (format === 'csv') {
    // TODO: Implement CSV export
  }

  return exportedData;  
};

// Helper function to calculate streak data
const calculateStreaks = async (userId: string): Promise<StreakData> => {
  const completedSteps = await prisma.microStep.findMany({
    where: { goal: { userId }, completedAt: { not: null } },
    orderBy: { completedAt: 'desc' },
  });

  let currentStreak = 0;
  let longestStreak = 0;
  let lastCompletedDate: Date | null = null;
  let streakStart: Date | null = null;

  for (const step of completedSteps) {
    if (!streakStart) {
      streakStart = step.completedAt;
    }

    const currentDate = new Date(step.completedAt);
    const prevDate = lastCompletedDate ? new Date(lastCompletedDate) : null;

    if (prevDate && currentDate.getDate() !== prevDate.getDate() + 1) {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 1;
      streakStart = currentDate;
    } else {
      currentStreak++;
    }

    lastCompletedDate = currentDate;
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    currentStreak,
    longestStreak,
    lastCompletedDate: lastCompletedDate || new Date(),
  };
};

// Helper function to calculate weekly average
const calculateWeeklyAverage = async (userId: string): Promise<number> => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  const completedStepsCount = await prisma.microStep.count({
    where: { goal: { userId }, completedAt: { gte: oneWeekAgo } },
  });

  return Math.round(completedStepsCount / 7);
};

// Helper function to calculate monthly average 
const calculateMonthlyAverage = async (userId: string): Promise<number> => {
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
  
  const completedStepsCount = await prisma.microStep.count({
    where: { goal: { userId }, completedAt: { gte: oneMonthAgo } },  
  });

  return Math.round(completedStepsCount / 30);
};

// Helper function to calculate category breakdown
const calculateCategoryBreakdown = async (userId: string): Promise<Record<string, number>> => {
  const categoryBreakdown = await prisma.microStep.groupBy({
    by: ['goal.category'],
    where: { goal: { userId }, completedAt: { not: null } },
    _count: true,
  });

  return categoryBreakdown.reduce((breakdown, item) => ({
    ...breakdown,
    [item.goal.category]: item._count,
  }), {});
};