import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { saveNotificationToken, syncNotificationSettings } from '../store/userSlice';
import store from '../store/store';

export async function registerForPushNotificationsAsync() {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Warning', 'Failed to get push token for push notification!');
      return;
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
    
    store.dispatch(saveNotificationToken(token));
    store.dispatch(syncNotificationSettings());

  } catch (err) {
    console.error('Error registering for push notifications:', err);
  }
}

export async function schedulePushNotification(title, body, data = {}) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        data: data,
      },
      trigger: { seconds: 1 },
    });
  } catch (err) {
    console.error('Error scheduling notification:', err);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});