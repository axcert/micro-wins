import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateNotificationToken } from '../api/userService';

const NOTIFICATION_TOKEN_KEY = 'NOTIFICATION_TOKEN';

export const requestNotificationPermission = async (): Promise<void> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Notification permission granted');
      await getNotificationToken();
    } else {
      console.log('Notification permission denied');
    }
  } catch (err) {
    console.error('Error requesting notification permission:', err);
  }
};

const getNotificationToken = async (): Promise<void> => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      await AsyncStorage.setItem(NOTIFICATION_TOKEN_KEY, fcmToken);
      await updateNotificationToken(fcmToken);
    } else {
      console.log('No FCM token available');
    }
  } catch (err) {
    console.error('Error getting FCM token:', err);
  }
};

export const handleNotificationTap = async (remoteMessage: any): Promise<void> => {
  console.log('Notification tapped:', remoteMessage);
  // TODO: Navigate to relevant screen based on notification data
};

messaging().onNotificationOpenedApp(handleNotificationTap);

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in background:', remoteMessage);
});

export const clearNotificationBadge = async (): Promise<void> => {
  if (Platform.OS === 'ios') {
    messaging().setApplicationIconBadgeNumber(0);
  }
};

export const scheduleLocalNotification = async (
  title: string,
  body: string,
  data: any = {},
): Promise<void> => {
  if (Platform.OS === 'android') {
    await messaging().createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: 4, // high importance
    });
  }

  await messaging().scheduleLocalNotification({
    title,
    body,
    data,
    android: {
      channelId: 'default',
    },
  });
};

export const cancelAllLocalNotifications = async (): Promise<void> => {
  await messaging().cancelAllLocalNotifications();
};