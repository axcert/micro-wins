import messaging from '@react-native-firebase/messaging';
import { updateNotificationToken } from '../store/userSlice';

export async function registerForNotifications(dispatch) {
  const token = await messaging().getToken();
  dispatch(updateNotificationToken(token));
  
  const platform = Platform.OS === 'ios' ? 'apns' : 'fcm';
  
  await fetch('https://api.example.com/notifications/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify({ token, platform }),
  });
}

export async function unregisterForNotifications() {
  await fetch('https://api.example.com/notifications/token', {
    method: 'DELETE',
  });
}