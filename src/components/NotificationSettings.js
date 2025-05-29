import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updatePreferences } from '../redux/notificationSlice';

const NotificationSettings = () => {
  const dispatch = useDispatch();
  const { preferences } = useSelector((state) => state.notification);

  const toggleDailyReminders = (value) => {
    dispatch(updatePreferences({ dailyReminders: value }));
  };

  const toggleProgressUpdates = (value) => {
    dispatch(updatePreferences({ progressUpdates: value }));
  };

  return (
    <View>
      <Text>Notification Settings</Text>
      <View>
        <Text>Daily Reminders</Text>
        <Switch
          value={preferences?.dailyReminders || false}
          onValueChange={toggleDailyReminders}
        />
      </View>
      <View>
        <Text>Progress Updates</Text>
        <Switch
          value={preferences?.progressUpdates || false}
          onValueChange={toggleProgressUpdates}
        />
      </View>
    </View>
  );
};

export default NotificationSettings;