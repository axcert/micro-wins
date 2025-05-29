import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchDashboardSummary,
  fetchStreakData,
  fetchProgressTimeline,
  fetchProgressStats,
  fetchAchievements,
} from '../redux/progressSlice';
import { ProgressChart } from '../components/ProgressChart';
import { AchievementList } from '../components/AchievementList';

const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const {
    dashboardSummary,
    streakData,
    progressTimeline,
    progressStats,
    achievements,
    loading,
    error,
  } = useSelector((state) => state.progress);

  React.useEffect(() => {
    dispatch(fetchDashboardSummary());
    dispatch(fetchStreakData());
    dispatch(fetchProgressTimeline());
    dispatch(fetchProgressStats());
    dispatch(fetchAchievements());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading analytics...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading analytics: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics Dashboard</Text>
      
      {dashboardSummary && (
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>
            Total Goals Completed: {dashboardSummary.totalGoalsCompleted}
          </Text>
          <Text style={styles.summaryText}>
            Current Streak: {dashboardSummary.currentStreak} days
          </Text>
        </View>
      )}

      {progressTimeline && (
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Progress Timeline</Text>
          <ProgressChart data={progressTimeline} />
        </View>
      )}

      {progressStats && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Progress Statistics</Text>
          <Text>Completion Rate: {progressStats.completionRate}%</Text>
          <Text>Average Daily Progress: {progressStats.avgDailyProgress}%</Text>
        </View>
      )}

      {achievements && (
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>Achievements</Text>
          <AchievementList achievements={achievements} />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  // ... other styles
});

export default AnalyticsScreen;