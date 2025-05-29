import { Request, Response } from 'express';
import * as stepService from '../services/stepService';

export const listSteps = async (req: Request, res: Response) => {
  try {
    const { goalId } = req.params;
    const steps = await stepService.getStepsByGoal(goalId);
    res.json(steps);
  } catch (error) {
    console.error('Failed to list steps', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getTodayStep = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const step = await stepService.getTodayStepForUser(userId);
    res.json(step);
  } catch (error) {
    console.error('Failed to get today step', error);
    res.status(500).json({ error: 'Internal server error' });
  }  
};

export const completeStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const step = await stepService.markStepCompleted(id);
    res.json(step);
  } catch (error) {
    console.error('Failed to complete step', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const skipStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const step = await stepService.skipStep(id, reason);
    res.json(step);
  } catch (error) {
    console.error('Failed to skip step', error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const swapStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const step = await stepService.swapStep(id);
    res.json(step); 
  } catch (error) {
    console.error('Failed to swap step', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateStep = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const step = await stepService.updateStepDetails(id, updates);
    res.json(step);
  } catch (error) {
    console.error('Failed to update step', error);
    res.status(500).json({ error: 'Internal server error' });    
  }
};

export const getStepHistory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const history = await stepService.getStepHistory(id);
    res.json(history);
  } catch (error) {
    console.error('Failed to get step history', error);
    res.status(500).json({ error: 'Internal server error' });
  }  
};