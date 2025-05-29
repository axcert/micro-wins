import { Request, Response } from 'express';
import * as goalService from '../services/goalService';
import { decomposeGoal } from '../services/aiService';
import Queue from 'bull';

const decomposeQueue = new Queue('decompose', process.env.REDIS_URL);

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, category, targetDays } = req.body;
    const userId = req.userId;

    const goal = await goalService.createGoal({
      userId,
      title,
      category, 
      targetDays,
    });

    // Queue goal decomposition job
    await decomposeQueue.add({ goalId: goal.id });

    res.status(201).json(goal);
  } catch (error) {
    console.error('Failed to create goal', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

export const listGoals = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;

    const goals = await goalService.listGoals(userId, Number(page), Number(limit));

    res.json(goals);
  } catch (error) {
    console.error('Failed to list goals', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const goal = await goalService.getGoalWithSteps(id, userId);

    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    res.json(goal);
  } catch (error) {
    console.error('Failed to get goal', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const { status } = req.body;

    const goal = await goalService.updateGoal(id, userId, { status });

    if (!goal) {
      res.status(404).json({ error: 'Goal not found' });
      return;
    }

    res.json(goal);
  } catch (error) {
    console.error('Failed to update goal', error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    await goalService.deleteGoal(id, userId);

    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete goal', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const listTemplates = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    const templates = await goalService.listTemplates(category as string);

    res.json(templates);
  } catch (error) {
    console.error('Failed to list goal templates', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};