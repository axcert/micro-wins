import prisma from '../config/prisma';
import * as Sentry from '@sentry/node';

export interface Goal {
  id: string;
  userId: string;
  title: string;
  category: string;
  targetDays: number;
  status: 'active' | 'paused' | 'completed';
  createdAt: Date;
}

export const createGoal = async (goal: Omit<Goal, 'id' | 'status' | 'createdAt'>): Promise<Goal> => {
  try {
    const userGoalCount = await prisma.goal.count({ where: { userId: goal.userId } });

    if (userGoalCount >= 3) {
      throw new Error('Goal limit exceeded');
    }

    return await prisma.goal.create({
      data: {
        ...goal,
        status: 'active',
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;  
  }
};

export const listGoals = async (userId: string, page: number, limit: number): Promise<Goal[]> => {
  try {
    return await prisma.goal.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const getGoalWithSteps = async (id: string, userId: string): Promise<Goal | null> => {
  try {
    return await prisma.goal.findFirst({
      where: { id, userId },
      include: {
        steps: {
          orderBy: { order: 'asc' },
        },
      },
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const updateGoal = async (id: string, userId: string, data: Partial<Goal>): Promise<Goal | null> => {
  try {
    return await prisma.goal.updateMany({
      where: { id, userId },
      data,
    });
  } catch (error) {
    Sentry.captureException(error); 
    throw error;
  }
};

export const deleteGoal = async (id: string, userId: string): Promise<void> => {
  try {
    await prisma.goal.deleteMany({
      where: { id, userId },
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};

export const listTemplates = async (category?: string): Promise<Goal[]> => {
  try {
    return await prisma.goalTemplate.findMany({
      where: category ? { category } : undefined,
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};