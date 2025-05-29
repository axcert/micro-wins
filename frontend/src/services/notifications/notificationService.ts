import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import { store } from '../../store';
import { setFcmToken } from '../../store/slices/userSlice';
import { handleNotificationTapped } from './notificationHandlers';

export const requestNotificationPermission = async (): Promise<void> => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      getFcmToken();
    }
  } catch (error) {
    console.error('Failed to request notification permission', error);
  }
};

const getFcmToken = async () => {
  try {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
      store.dispatch(setFcmToken(fcmToken));
      // TODO: Send fcmToken to backend server
    } 
  } catch (error) {
    console.error('Failed to get FCM token', error);
  }
};

export const initNotifications = async () => {
  messaging().onNotificationOpenedApp(handleNotificationTapped);
  
  messaging()
    .getInitialNotification()
    .then(handleNotificationTapped);

  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('Notification in foreground:', remoteMessage);
    // TODO: Handle foreground notification
  });

  return unsubscribe;
};

export const clearBadgeCount = () => {
  if (Platform.OS === 'ios') {
    // Clear iOS notification badge count
    messaging().setApplicationIconBadgeNumber(0);
  }
};