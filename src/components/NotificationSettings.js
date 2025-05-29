import React, { useState } from 'react';
import { View, Text, Switch, Button, Platform, TimePickerAndroid, DatePickerIOS } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferences } from '../redux/notificationSlice';
import { sendTestNotification } from '../api/notificationApi';

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const { preferences } = useSelector((state) => state.notification);
  const [notificationTime, setNotificationTime] = useState(new Date(preferences?.notificationTime));

  const toggleNotifications = (value) => {
    dispatch(updatePreferences({ notificationsEnabled: value }));
  };

  const showTimePicker = async () => {
    try {
      let time;
      if (Platform.OS === 'android') {
        const { action, hour, minute } = await TimePickerAndroid.open({
          hour: notificationTime.getHours(),
          minute: notificationTime.getMinutes(),
          is24Hour: true,
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          time = new Date();
          time.setHours(hour);
          time.setMinutes(minute); 
        }
      } else {
        time = await new Promise((resolve) => {
          DatePickerIOS.open({
            date: notificationTime,
            mode: 'time',
            onDateChange: resolve,
          });
        });
      }

      if (time) {
        setNotificationTime(time);
        dispatch(updatePreferences({ notificationTime: time.toISOString() }));
      }
    } catch (error) {
      console.error('Failed to open time picker:', error);
    }
  };

  const handleTestNotification = async () => {
    try {
      await sendTestNotification();
    } catch (error) {
      console.error('Failed to send test notification:', error);
    }
  };

  return (
    <View>
      <Text>Notification Settings</Text>
      
      <View>
        <Text>Enable Notifications</Text>
        <Switch
          value={preferences?.notificationsEnabled ?? true}
          onValueChange={toggleNotifications}
        />
      </View>

      <View>
        <Text>Daily Reminder Time</Text>
        <Button title={notificationTime.toLocaleTimeString()} onPress={showTimePicker} />
      </View>
      
      <Text>Time Zone: {Intl.DateTimeFormat().resolvedOptions().timeZone}</Text>

      <Button title="Send Test Notification" onPress={handleTestNotification} />
    </View>
  );
};

export default NotificationSettings;