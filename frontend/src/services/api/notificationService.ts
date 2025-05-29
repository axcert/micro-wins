import axios from 'axios';
import { API_URL } from '../../constants/config';

export const updateNotificationToken = async (token: string): Promise<void> => {
  try {
    await axios.post(`${API_URL}/notifications/token`, { token });
    console.log('Notification token updated successfully');
  } catch (err) {
    console.error('Error updating notification token:', err);
    throw err;
  }
};

export const updateNotificationPreferences = async (preferences: NotificationPreferences): Promise<void> => {
  try {
    await axios.put(`${API_URL}/notifications/preferences`, preferences);
    console.log('Notification preferences updated successfully');
  } catch (err) {
    console.error('Error updating notification preferences:', err); 
    throw err;
  }
};

export const sendTestNotification = async (): Promise<void> => {
  try {
    await axios.post(`${API_URL}/notifications/test`);
    console.log('Test notification sent successfully');
  } catch (err) {
    console.error('Error sending test notification:', err);
    throw err;
  }
};

export const fetchNotificationHistory = async (): Promise<NotificationHistory[]> => {
  try {
    const response = await axios.get(`${API_URL}/notifications/history`);
    return response.data;
  } catch (err) {
    console.error('Error fetching notification history:', err);
    throw err;
  }
};

export const deleteNotificationToken = async (): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/notifications/token`);
    console.log('Notification token deleted successfully');
  } catch (err) {
    console.error('Error deleting notification token:', err);
    throw err;
  }
};