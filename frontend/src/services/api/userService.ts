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