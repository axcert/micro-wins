import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const API_URL = 'https://api.example.com/notifications';

export const registerForPushNotifications = async () => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
      const token = await messaging().getToken();
      await sendTokenToServer(token);
    }
  } catch (error) {
    console.error('Error registering for push notifications:', error);
  }
};

const sendTokenToServer = async (token) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({ token }),
    });

    if (!response.ok) {
      throw new Error('Failed to send token to server');
    }
  } catch (error) {
    console.error('Error sending token to server:', error);
  }
};

export const unregisterFromPushNotifications = async () => {
  try {
    await messaging().deleteToken();
    await removeTokenFromServer();
  } catch (error) {
    console.error('Error unregistering from push notifications:', error);
  }
};

const removeTokenFromServer = async () => {
  try {
    const response = await fetch(`${API_URL}/unregister`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem('accessToken')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to remove token from server');
    }
  } catch (error) {
    console.error('Error removing token from server:', error);
  }
};