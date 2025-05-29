import React from 'react';
import { Button } from 'react-native';
import notifee from '@notifee/react-native';

const TestNotification = () => {
  const sendTestNotification = async () => {
    try {
      const channelId = await notifee.createChannel({
        id: 'test_channel',
        name: 'Test Channel',
        sound: 'default',
      });

      await notifee.displayNotification({
        title: 'Test Notification',
        body: 'This is a test notification',
        android: {
          channelId,
          sound: 'default',
        },
      });
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  };

  return (
    <Button
      title="Send Test Notification"
      onPress={sendTestNotification}
    />
  );
};

export default TestNotification;