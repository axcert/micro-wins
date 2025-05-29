import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

export const updateNotificationSettings = async (time: string, enabled: boolean) => {
  if (enabled) {
    const [hour, minute] = time.split(':').map(Number);
    
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + 5000, // 5 seconds from now for testing
      // For production:
      // timestamp: new Date(Date.now()).setHours(hour, minute, 0, 0),
      repeatFrequency: 'DAILY',
    };

    await notifee.createTriggerNotification(
      {
        id: 'daily-notification',
        title: "Today's MicroWin",
        body: "Let's achieve today's small goal!",
        android: {
          channelId: 'microwin-notifications',
        },
      },
      trigger,
    );
  } else {
    await notifee.cancelTriggerNotification('daily-notification');
  }
};

export const sendTestNotification = async () => {
  await notifee.displayNotification({
    id: 'test-notification',
    title: 'Test Notification',
    body: 'This is a test notification',
    android: {
      channelId: 'microwin-notifications',
    },
  });
};