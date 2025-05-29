import { Request, Response } from 'express';
import { prisma } from '../config/database';
import { logger } from '../utils/logger';
import * as Sentry from '@sentry/node';
import { sendNotificationBatch } from '../services/notificationService';

export const registerNotificationToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token, platform } = req.body;
    const userId = req.userId;

    await prisma.notificationToken.upsert({
      where: {
        token_userId: {
          token,
          userId,
        },
      },
      update: {
        platform,
      },
      create: {
        token,
        platform,
        userId,
      },
    });

    res.status(200).json({ message: 'Notification token registered successfully' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error registering notification token:', error);
    res.status(500).json({ error: 'An error occurred while registering notification token' });
  }
};

export const updateNotificationPreferences = async (req: Request, res: Response): Promise<void> => {
  try {
    const { dailyReminder, timezone } = req.body;
    const userId = req.userId;

    await prisma.notificationPreference.upsert({
      where: {
        userId,
      },
      update: {
        dailyReminder,
        timezone,
      },
      create: {
        userId,
        dailyReminder,
        timezone,
      },
    });

    res.status(200).json({ message: 'Notification preferences updated successfully' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error updating notification preferences:', error);
    res.status(500).json({ error: 'An error occurred while updating notification preferences' });
  }
};

export const sendTestNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const notificationTokens = await prisma.notificationToken.findMany({
      where: {
        userId,
      },
    });

    await sendNotificationBatch(notificationTokens.map((token) => token.token), {
      title: 'Test Notification',
      body: 'This is a test notification from MicroWins',
    });

    res.status(200).json({ message: 'Test notification sent successfully' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error sending test notification:', error);
    res.status(500).json({ error: 'An error occurred while sending test notification' });
  }
};

export const getNotificationHistory = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.userId;
    const notificationHistory = await prisma.notificationHistory.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.status(200).json(notificationHistory);
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error retrieving notification history:', error);
    res.status(500).json({ error: 'An error occurred while retrieving notification history' });
  }
};

export const unregisterNotificationToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { token } = req.body;
    const userId = req.userId;

    await prisma.notificationToken.delete({
      where: {
        token_userId: {
          token,
          userId,
        },
      },
    });

    res.status(200).json({ message: 'Notification token unregistered successfully' });
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error unregistering notification token:', error);
    res.status(500).json({ error: 'An error occurred while unregistering notification token' });
  }
};