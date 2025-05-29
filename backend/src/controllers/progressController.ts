import { Request, Response } from 'express';
import * as progressService from '../services/progressService';
import * as Sentry from '@sentry/node';

export const getDashboardSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const dashboardSummary = await progressService.getDashboardSummary(userId);
    res.json(dashboardSummary);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getStreaks = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const streaks = await progressService.getStreaks(userId);
    res.json(streaks);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getProgressTimeline = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const timeline = await progressService.getProgressTimeline(userId);
    res.json(timeline);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }  
};

export const getStatistics = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const stats = await progressService.getStatistics(userId);
    res.json(stats);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAchievements = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const achievements = await progressService.getAchievements(userId);
    res.json(achievements);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const exportProgressData = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const { format } = req.query;
    const exportedData = await progressService.exportProgressData(userId, format as string);
    res.send(exportedData);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};