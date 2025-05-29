import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { chunk } from 'lodash';
import * as Sentry from '@sentry/node';
import { logger } from '../utils/logger';
import { prisma } from '../config/database';

const expo = new Expo();

export const sendNotificationBatch = async (tokens: string[], message: ExpoPushMessage): Promise<void> => {
  try {
    const chunks = chunk(tokens, 100);

    for (const tokenChunk of chunks) {
      const messages = tokenChunk.map((token) => ({
        ...message,
        to: token,
      }));

      const ticketChunk = await expo.sendPushNotificationsAsync(messages);
      logger.info('Notification batch sent:', ticketChunk);

      await prisma.notificationHistory.createMany({
        data: ticketChunk.map((ticket) => ({
          token: ticket.id,
          status: ticket.status,
          message: JSON.stringify(message),
        })),
      });
    }
  } catch (error) {
    Sentry.captureException(error);
    logger.error('Error sending notification batch:', error);
  }
};