import React, { useState } from 'react';
import { View, Text, Switch, Button, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setNotificationTime, setNotificationsEnabled } from '../../store/slices/userSlice';
import { updateUserSettings } from '../../services/api/userService';
import { scheduleNotification, cancelNotifications } from '../../services/notifications';
import { typography, spacing, colors } from '../../constants/theme';

const NotificationSettingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { notificationTime, notificationsEnabled } = useSelector((state: RootState) => state.user);

  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const handleNotificationToggle = async (value: boolean) => {
    dispatch(setNotificationsEnabled(value));
    try {
      await updateUserSettings({ notificationsEnabled: value });
      if (value) {
        scheduleNotification(notificationTime);
      } else {
        cancelNotifications();
      }
    } catch (err) {
      console.error('Error updating notification settings:', err);
    }
  };

  const handleTimeConfirm = async (time: Date) => {
    setTimePickerVisible(false);
    const timeString = time.toISOString();
    dispatch(setNotificationTime(timeString));
    try {
      await updateUserSettings({ notificationTime: timeString });
      if (notificationsEnabled) {
        scheduleNotification(timeString);
      }
    } catch (err) {
      console.error('Error updating notification time:', err);
    }
  };

  const handleTestNotification = () => {
    scheduleNotification(notificationTime, true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Enable Notifications</Text>
        <Switch 
          value={notificationsEnabled}
          onValueChange={handleNotificationToggle}
        />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Daily Reminder Time</Text>
        <Button title={notificationTime} onPress={() => setTimePickerVisible(true)} />
      </View>
      <Text style={styles.timezone}>Time Zone: GMT+5:30</Text>
      <Button title="Send Test Notification" onPress={handleTestNotification} />
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleTimeConfirm}
        onCancel={() => setTimePickerVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  label: {
    ...typography.body,
  },
  timezone: {
    ...typography.caption,
    color: colors.text.muted,
    marginBottom: spacing.lg,
  },
});

export default NotificationSettingsScreen;