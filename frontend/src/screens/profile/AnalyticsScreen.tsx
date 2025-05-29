import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, RefreshControl, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalyticsData } from '../../store/slices/analyticsSlice';
import { RootState } from '../../store';
import ProgressChart from '../../components/profile/ProgressChart';
import StatisticsCard from '../../components/profile/StatisticsCard';

const AnalyticsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state: RootState) => state.analytics);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchAnalyticsData());
    setRefreshing(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading analytics data. Please try again.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ProgressChart progress={data.progress} />
      <StatisticsCard title="Completed Goals" value={data.completedGoals} />
      <StatisticsCard title="Active Streaks" value={data.activeStreaks} />
      <StatisticsCard title="Total Tasks Completed" value={data.totalTasksCompleted} />
      {/* TODO: Implement export and share functionality */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    color: '#F44336',
    textAlign: 'center',
  },
});

export default AnalyticsScreen;