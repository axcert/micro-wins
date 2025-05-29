// ... existing imports ...

export const updateNotificationToken = async (token: string): Promise<void> => {
  try {
    const response = await axiosInstance.post('/users/notification-token', { token });
    console.log('Notification token updated successfully');
  } catch (err) {
    console.error('Error updating notification token:', err);
    throw err;
  }
};

export const updateUserSettings = async (settings: {
  notificationsEnabled?: boolean;
  notificationTime?: string;
}): Promise<void> => {
  try {
    const response = await axiosInstance.patch('/users/settings', settings);
    console.log('User settings updated successfully');
  } catch (err) {
    console.error('Error updating user settings:', err);
    throw err;
  }
};