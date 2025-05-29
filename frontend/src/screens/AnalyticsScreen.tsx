import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAppSelector, useAppDispatch } from '../hooks';
import { fetchAnalyticsSummary, fetchCalendarHeatmap, fetchStreakStats, fetchCompletionRate } from '../services/api/analyticsService';
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory-native';
import { CalendarHeatmap } from 'react-native-calendar-heatmap';

const AnalyticsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [heatmapData, setHeatmapData] = useState<CalendarHeatmapData | null>(null);
  const [streaks, setStreaks] = useState<StreakStats | null>(null);
  const [completionRates, setCompletionRates] = useState<CompletionRate | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const summaryData = await fetchAnalyticsSummary();
        setSummary(summaryData);
        
        const heatmapData = await fetchCalendarHeatmap();
        setHeatmapData(heatmapData);

        const streakData = await fetchStreakStats();
        setStreaks(streakData);

        const completionData = await fetchCompletionRate();
        setCompletionRates(completionData);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
      }
    };

    fetchAnalytics();
  }, []);
  
  if (!summary || !heatmapData || !streaks || !completionRates) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Analytics</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text>Total Goals: {summary.totalGoals}</Text>
        <Text>Completed Goals: {summary.completedGoals}</Text>
        <Text>Total Tasks: {summary.totalTasks}</Text>
        <Text>Completed Tasks: {summary.completedTasks}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Streaks</Text>
        <Text>Current Streak: {streaks.currentStreak} days</Text>
        <Text>Best Streak: {streaks.bestStreak} days</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Calendar Heatmap</Text>
        <CalendarHeatmap
          values={Object.entries(heatmapData).map(([date, count]) => ({ date, count }))}
          numberOfDays={90}
        />  
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Completion Rates</Text>
        
        <VictoryChart>
          <VictoryAxis
            tickValues={['Daily', 'Weekly', 'Monthly', 'All Time']}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}%`}
          />
          <VictoryBar
            data={[
              { x: 'Daily', y: completionRates.daily },
              { x: 'Weekly', y: completionRates.weekly },
              { x: 'Monthly', y: completionRates.monthly },
              { x: 'All Time', y: completionRates.allTime },
            ]}
          />
        </VictoryChart>
      </View>
    </ScrollView>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default AnalyticsScreen;