import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { VictoryLine, VictoryTheme, VictoryAxis } from 'victory-native';
import { CalendarHeatmap } from 'react-native-calendar-heatmap';
import { useSelector } from 'react-redux';
import { format, subDays } from 'date-fns';
import { captureRef } from 'react-native-view-shot';

const ProgressScreen = () => {
  const [dateRange, setDateRange] = useState('weekly');
  const { completedTasks, currentStreak, longestStreak } = useSelector(state => state.progress);

  const shareProgress = async () => {
    try {
      const uri = await captureRef(this.chartRef, {
        format: 'png',
        quality: 0.8,
      });
      
      await Share.share({
        message: 'Check out my goal progress!',
        url: uri,
      });
    } catch (error) {
      console.error('Error sharing progress', error);
    }
  };

  const renderChart = () => {
    const data = completedTasks.map((task, index) => ({
      x: index + 1,
      y: task.completedAt ? 1 : 0,
    }));

    return (
      <View ref={(ref) => (this.chartRef = ref)}>
        <VictoryLine
          data={data}
          theme={VictoryTheme.material}
          style={{
            data: { stroke: '#8B5CF6' },
          }}
        />
        <VictoryAxis dependentAxis />
        <VictoryAxis
          tickFormat={(x) => `Day ${x}`}
          style={{
            tickLabels: { angle: -45 },
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Progress</Text>

      <View style={styles.dateRangeContainer}>
        <TouchableOpacity
          style={[styles.dateRangeButton, dateRange === 'weekly' && styles.activeButton]}
          onPress={() => setDateRange('weekly')}
        >
          <Text style={styles.dateRangeButtonText}>Weekly</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dateRangeButton, dateRange === 'monthly' && styles.activeButton]}
          onPress={() => setDateRange('monthly')}
        >
          <Text style={styles.dateRangeButtonText}>Monthly</Text>
        </TouchableOpacity>
      </View>

      {renderChart()}

      <View style={styles.calendarContainer}>
        <CalendarHeatmap
          startDate={subDays(new Date(), dateRange === 'weekly' ? 7 : 30)}
          endDate={new Date()}
          values={completedTasks.map((task) => ({
            date: task.completedAt ? format(new Date(task.completedAt), 'yyyy-MM-dd') : null,
            count: task.completedAt ? 1 : 0,
          }))}
          gutterSize={2}
        />
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Current Streak</Text>
          <Text style={styles.statValue}>{currentStreak} days</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Best Streak</Text>
          <Text style={styles.statValue}>{longestStreak} days</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Completion Rate</Text>
          <Text style={styles.statValue}>
            {Math.round((completedTasks.filter((task) => task.completedAt).length / completedTasks.length) * 100)}%
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareProgress}>
        <Text style={styles.shareButtonText}>Share Progress</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  dateRangeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EEE',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#8B5CF6',
  },
  dateRangeButtonText: {
    fontSize: 16,
    color: '#333',
  },
  calendarContainer: {
    marginVertical: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#8B5CF6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProgressScreen;