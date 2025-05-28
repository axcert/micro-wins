import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Request permissions
export const requestNotificationPermissions = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return false;
    }
    
    return true;
  } else {
    console.log('Must use physical device for Push Notifications');
    return false;
  }
};

// Schedule notification
export const scheduleNotification = async (time) => {
  // Cancel all existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  // Request permissions first
  const hasPermission = await requestNotificationPermissions();
  if (!hasPermission) {
    console.log('No notification permissions');
    return;
  }

  // Create notification channel for Android
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('goal-reminders', {
      name: 'Goal Reminders',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  // Schedule the notification
  const trigger = {
    hour: time.getHours(),
    minute: time.getMinutes(),
    repeats: true,
  };

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Time for today's micro-step!",
      body: 'Open the app to see your next 1% progress move.',
      sound: 'default',
    },
    trigger,
  });
  
  console.log('Notification scheduled for', time);
};

// Cancel all notifications
export const cancelNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  console.log('All notifications cancelled');
};

// Listen for notification responses (when user taps notification)
export const addNotificationResponseListener = (callback) => {
  return Notifications.addNotificationResponseReceivedListener(callback);
};

// Listen for notifications received while app is in foreground
export const addNotificationReceivedListener = (callback) => {
  return Notifications.addNotificationReceivedListener(callback);
};