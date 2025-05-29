import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalendarList } from 'react-native-calendars';
import { useSelector } from 'react-redux';

const ProgressCalendar = () => {
  const progressData = useSelector(state => state.progress.data);

  // Transform progress data into calendar format
  const calendarData = progressData.reduce((acc, item) => {
    acc[item.date] = { marked: true };
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      <CalendarList
        pastScrollRange={12}
        futureScrollRange={0}
        scrollEnabled={true}
        showScrollIndicator={true}
        markedDates={calendarData}
        theme={{
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#b6c1cd',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#00adf5',
          dayTextColor: '#2d4150',
          textDisabledColor: '#d9e1e8',
          dotColor: '#00adf5',
          selectedDotColor: '#ffffff',
          arrowColor: 'orange',
          monthTextColor: 'blue',
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default ProgressCalendar;