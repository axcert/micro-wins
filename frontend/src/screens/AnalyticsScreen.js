import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, RefreshControl, ScrollView, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAnalytics } from '../store/analyticsSlice';
import { LineChart } from 'react-native-chart-kit';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.analytics);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchAnalytics());
  }, [dispatch]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(fetchAnalytics()).finally(() => setRefreshing(false));
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out my goal progress!',
        url: 'https://example.com/analytics', 
      });
    } catch (err) {
      console.error('Error sharing analytics:', err);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRefresh} />;
  }

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.title}>Analytics</Text>
        
        <LineChart
          data={{
            labels: data.labels,
            datasets: [
              {
                data: data.progress,
              },
            ],
          }}
          width={350}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={styles.chart}
        />

        <Text style={styles.statsTitle}>Weekly Stats</Text>
        <Text>Tasks Completed: {data.tasksCompleted}</Text>
        <Text>Consistency: {data.consistencyPercentage}%</Text>

        <View style={styles.shareButton}>  
          <Button title="Share Progress" onPress={onShare} />
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chart: {
    marginBottom: 30,
    borderRadius: 16,
  },
  statsTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  shareButton: {
    marginTop: 30,
  },
});

export default AnalyticsScreen;