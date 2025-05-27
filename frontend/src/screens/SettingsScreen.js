import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { updateNotificationSettings } from '../store/userSlice';
import { scheduleNotification, cancelNotifications } from '../utils/notifications';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { notificationTime, notificationsEnabled } = useSelector(state => state.user);
  const [showPicker, setShowPicker] = useState(false);

  const toggleNotifications = () => {
    dispatch(updateNotificationSettings({ 
      notificationsEnabled: !notificationsEnabled
    }));
    if (!notificationsEnabled) {
      scheduleNotification(notificationTime);
    } else {
      cancelNotifications();
    }
  };

  const handleTimePicked = (event, selectedTime) => {
    const currentTime = selectedTime || notificationTime;
    setShowPicker(false);
    dispatch(updateNotificationSettings({ notificationTime: currentTime }));
    if (notificationsEnabled) {
      scheduleNotification(currentTime);
    }
  };

  return (
    <View>
      <Text>Notification Settings</Text>
      
      <View>
        <Text>Enable Notifications</Text>
        <Switch 
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </View>

      <TouchableOpacity onPress={() => setShowPicker(true)}>
        <Text>Daily Reminder Time</Text>
        <Text>{notificationTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={notificationTime}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={handleTimePicked}
        />
      )}

      <TouchableOpacity onPress={() => scheduleNotification(notificationTime)}>
        <Text>Test Notification</Text>  
      </TouchableOpacity>
      
    </View>
  );
};

export default SettingsScreen;