import prisma from '../config/prisma';
import * as Sentry from '@sentry/node';

export const addStepsToGoal = async (goalId: string, steps: string[]): Promise<void> => {
  try {
    await prisma.step.createMany({
      data: steps.map((title, index) => ({
        goalId,
        title,
        order: index + 1,
      })),
    });
  } catch (error) {
    Sentry.captureException(error);
    throw error;  
  }
};