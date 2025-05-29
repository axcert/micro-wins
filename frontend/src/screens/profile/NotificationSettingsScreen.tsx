import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button } from '../../components/common/Button';
import { updateNotificationSettings } from '../../store/slices/userSlice';
import * as notificationService from '../../services/notificationService';

const NotificationSettingsScreen = () => {
  const dispatch = useDispatch();
  const { notificationTime, notificationsEnabled } = useSelector((state) => state.user);
  
  const [selectedTime, setSelectedTime] = useState(notificationTime);
  const [enabled, setEnabled] = useState(notificationsEnabled);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, time) => {
    if (time) {
      const formattedTime = time.toTimeString().slice(0, 5);
      setSelectedTime(formattedTime);
    }
    setShowTimePicker(false);
  };

  const handleNotificationToggle = (value) => {
    setEnabled(value);
  };

  const handleSaveSettings = async () => {
    try {
      await notificationService.updateNotificationSettings(selectedTime, enabled);
      dispatch(updateNotificationSettings({ time: selectedTime, enabled }));
      // Show success message
    } catch (error) {
      console.error('Failed to update notification settings', error);
      // Show error message  
    }
  };

  const handleTestNotification = async () => {
    try {
      await notificationService.sendTestNotification();
      // Show success message
    } catch (error) {
      console.error('Failed to send test notification', error); 
      // Show error message
    }
  };

  return (
    <View>
      <Text>Daily Notification Time</Text>
      <Button title={selectedTime} onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={new Date(`2000-01-01T${selectedTime}`)}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
      
      <Text>Enable Notifications</Text>
      <Switch value={enabled} onValueChange={handleNotificationToggle} />

      <Button title="Save Settings" onPress={handleSaveSettings} />
      <Button title="Send Test Notification" onPress={handleTestNotification} />
    </View>
  );
};

export default NotificationSettingsScreen;