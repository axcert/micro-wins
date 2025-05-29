import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  timestamp: number,
  data?: Record<string, any>
) => {
  try {
    const channelId = await notifee.createChannel({
      id: 'goal_reminders',
      name: 'Goal Reminders',
      sound: 'default',
    });

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp,
    };

    await notifee.createTriggerNotification(
      {
        title,
        body,
        android: {
          channelId,
          sound: 'default',
        },
        data,
      },
      trigger
    );
  } catch (error) {
    console.error('Failed to schedule local notification:', error);
  }
};