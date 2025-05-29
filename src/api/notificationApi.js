import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

export const registerForPushNotifications = async () => {
  try {
    await messaging().requestPermission();
    const token = await messaging().getToken();
    console.log('FCM Token:', token);
    
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
    });

  } catch (error) {
    console.error('Failed to register for push notifications:', error);
  }
};

export const unregisterFromPushNotifications = async () => {
  try {
    await messaging().deleteToken();
    PushNotification.abandonPermissions();
  } catch (error) {
    console.error('Failed to unregister from push notifications:', error);
  }
};

export const sendTestNotification = async () => {
  try {
    const notification = {
      title: 'Test Notification',
      message: 'This is a test push notification.',
    };

    PushNotification.localNotification(notification);
  } catch (error) {
    console.error('Failed to send test notification:', error);
    throw error;
  }
};