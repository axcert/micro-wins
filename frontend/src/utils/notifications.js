import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});

export const scheduleNotification = (time) => {
  PushNotification.cancelAllLocalNotifications();

  PushNotification.localNotificationSchedule({
    channelId: 'goal-reminders',
    title: 'Time for today\'s micro-step!',
    message: 'Open the app to see your next 1% progress move.',
    date: time,
    allowWhileIdle: true,
    repeatType: 'day',
  });
};

export const cancelNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};