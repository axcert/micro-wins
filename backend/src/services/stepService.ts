import Step from '../models/Step';
import Goal from '../models/Goal';
import User from '../models/User';

export const getStepsByGoal = async (goalId: string): Promise<Step[]> => {
  return Step.findAll({ where: { goalId } });
};

export const getTodayStepForUser = async (userId: string): Promise<Step | null> => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  const goal = await Goal.findOne({ where: { userId, status: 'active' } });
  if (!goal) {
    return null;
  }

  const today = new Date().toISOString().split('T')[0];
  const step = await Step.findOne({ 
    where: { 
      goalId: goal.id,
      scheduledDate: today,
      completedAt: null,
      skippedAt: null,
      swappedAt: null,
    },
  });

  return step;
};

export const markStepCompleted = async (id: string): Promise<Step> => {
  const step = await Step.findByPk(id);
  if (!step) {
    throw new Error('Step not found');
  }

  step.completedAt = new Date();
  await step.save();
  return step;
};

export const skipStep = async (id: string, reason: string): Promise<Step> => {
  const step = await Step.findByPk(id);
  if (!step) {
    throw new Error('Step not found');
  }

  step.skippedAt = new Date();
  step.skipReason = reason;
  await step.save();
  return step;
};

export const swapStep = async (id: string): Promise<Step> => {
  const step = await Step.findByPk(id);
  if (!step) {
    throw new Error('Step not found');
  }

  step.swappedAt = new Date();

  // TODO: Generate a replacement step

  await step.save();
  return step;
};

export const updateStepDetails = async (id: string, updates: Partial<Step>): Promise<Step> => {
  const step = await Step.findByPk(id);
  if (!step) {
    throw new Error('Step not found');  
  }

  Object.assign(step, updates);
  await step.save();
  return step;
};

export const getStepHistory = async (id: string): Promise<Step[]> => {
  const goal = await Goal.findByPk(id);
  if (!goal) {
    throw new Error('Goal not found');
  }

  return Step.findAll({ 
    where: { goalId: goal.id },
    order: [['scheduledDate', 'DESC']],
  });
};