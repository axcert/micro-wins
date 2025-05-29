import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import apiClient from './apiClient';
import { handleError } from '../utils/errorUtils';

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
    handleError(error, 'Error registering for push notifications');
  }
};

export const unregisterFromPushNotifications = async () => {
  try {
    await messaging().deleteToken();
    await removeTokenFromServer();
  } catch (error) {
    handleError(error, 'Error unregistering from push notifications');
  }
};

export const sendTokenToServer = async (token) => {
  try {
    const response = await apiClient.post(`${API_URL}/token`, {
      token,
    });

    if (!response.data.success) {
      throw new Error('Failed to send token to server');
    }
  } catch (error) {
    handleError(error, 'Error sending token to server');
  }
};

export const removeTokenFromServer = async () => {
  try {
    const token = await AsyncStorage.getItem('fcmToken');

    if (token) {
      const response = await apiClient.delete(`${API_URL}/token`, {
        data: {
          token,
        },
      });

      if (!response.data.success) {
        throw new Error('Failed to remove token from server');
      }
    }
  } catch (error) {
    handleError(error, 'Error removing token from server');
  }
};

export const updateNotificationPreferences = async (preferences) => {
  try {
    const response = await apiClient.put(`${API_URL}/preferences`, preferences);
    return response.data;
  } catch (error) {
    handleError(error, 'Error updating notification preferences');
    return null;
  }
};

export const sendTestNotification = async () => {
  try {
    const response = await apiClient.post(`${API_URL}/test`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error sending test notification');
    return null;
  }
};

export const fetchNotificationHistory = async (userId) => {
  try {
    const response = await apiClient.get(`${API_URL}/history/${userId}`);
    return response.data;
  } catch (error) {
    handleError(error, 'Error fetching notification history');
    return null;
  }
};