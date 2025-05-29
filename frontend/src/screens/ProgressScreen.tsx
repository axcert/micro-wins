import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { format, subDays } from 'date-fns';
import { fetchProgressHistory, ProgressDataPoint, exportProgressData } from '../services/api/analyticsService';
import { RootState, AppDispatch } from '../store';
import * as Sentry from '@sentry/react-native';
import { colors, typography } from '../theme';

const ProgressScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.auth.userId);
  
  const [progressHistory, setProgressHistory] = useState<ProgressDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [dateRange, setDateRange] = useState<'week' | 'month'>('week');

  useEffect(() => {
    const loadProgressData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const history = await fetchProgressHistory(dispatch, userId!, dateRange);
        setProgressHistory(history);
      } catch (err) {
        setError(err);
        Sentry.captureException(err);
      }

      setIsLoading(false);
    };

    loadProgressData();
  }, [userId, dateRange]);

  const totalDays = dateRange === 'week' ? 7 : 30;
  const startDate = subDays(new Date(), totalDays);
  const endDate = new Date();

  const totalSteps = progressHistory.reduce((sum, point) => sum + point.totalSteps, 0);
  const completedSteps = progressHistory.reduce((sum, point) => sum + point.completedSteps, 0);
  const completionRate = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

  const currentStreak = calculateCurrentStreak(progressHistory);
  const longestStreak = calculateLongestStreak(progressHistory);

  const shareProgress = async () => {
    try {
      const csvData = await exportProgressData('csv');
      await Share.share({
        message: 'Check out my MicroWins progress!',
        url: `data:text/csv;base64,${base64.encode(csvData)}`,
      });
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Oops! Failed to load progress data.</Text>
      </View>  
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress &amp; Analytics</Text>
        <View style={styles.dateRangeSelector}>
          <TouchableOpacity 
            style={[styles.dateRangeOption, dateRange === 'week' && styles.activeOption]}
            onPress={() => setDateRange('week')}
          >
            <Text style={styles.dateRangeText}>Week</Text>  
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.dateRangeOption, dateRange === 'month' && styles.activeOption]} 
            onPress={() => setDateRange('month')}
          >
            <Text style={styles.dateRangeText}>Month</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Completion Rate</Text>
        <Text style={styles.completionRate}>{completionRate}%</Text>
      </View>

      <View style={styles.chartContainer}>
        <VictoryChart
          theme={VictoryTheme.material}
          height={200}
        >
          <VictoryAxis 
            tickFormat={(x) => format(new Date(x), 'MMM d')}
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary },  
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(y) => `${y}`}
            style={{
              axis: { stroke: colors.text.secondary },
              tickLabels: { fill: colors.text.secondary },
            }}
          />
          <VictoryLine
            data={progressHistory}
            x="date"
            y="completedSteps"
            style={{
              data: { stroke: colors.primary },
            }}
          />
        </VictoryChart>

        <View style={styles.chartLegend}>
          <Text style={styles.chartLegendText}>{format(startDate, 'MMM d')} - {format(endDate, 'MMM d')}</Text>
        </View>
      </View>

      <View style={styles.streakContainer}>
        <View style={styles.streakItem}>
          <Text style={styles.streakLabel}>Current Streak</Text>  
          <Text style={styles.streakValue}>{currentStreak} days</Text>
        </View>

        <View style={styles.streakItem}>
          <Text style={styles.streakLabel}>Longest Streak</Text>
          <Text style={styles.streakValue}>{longestStreak} days</Text>  
        </View>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={shareProgress}>
        <Text style={styles.shareButtonText}>Share Progress</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const calculateCurrentStreak = (progressHistory: ProgressDataPoint[]): number => {
  let currentStreak = 0;

  for (let i = progressHistory.length - 1; i >= 0; i--) {
    if (progressHistory[i].completedSteps > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return currentStreak;
};

const calculateLongestStreak = (progressHistory: ProgressDataPoint[]): number => {
  let longestStreak = 0;
  let currentStreak = 0;

  for (let i = 0; i < progressHistory.length; i++) {
    if (progressHistory[i].completedSteps > 0) {
      currentStreak++;
    } else {
      longestStreak = Math.max(longestStreak, currentStreak);
      currentStreak = 0;
    }
  }

  return Math.max(longestStreak, currentStreak);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: 20,
    paddingTop: 20,
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
    padding: 20,
  },
  errorText: {
    ...typography.body,
    color: colors.text.error,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
  },
  dateRangeSelector: {
    flexDirection: 'row',
  },
  dateRangeOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    marginLeft: 10,
  },
  activeOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateRangeText: {
    ...typography.body,
    color: colors.text.primary,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  progressTitle: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  completionRate: {
    ...typography.h1,
    color: colors.text.primary,
  },
  chartContainer: {
    marginBottom: 30,
  },
  chartLegend: {
    alignItems: 'center',
    marginTop: 10,
  },
  chartLegendText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  streakItem: {
    alignItems: 'center',
  },
  streakLabel: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: 5,
  },
  streakValue: {
    ...typography.h3,
    color: colors.text.primary,
  },
  shareButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    ...typography.body,
    color: colors.background.primary,
  },
});

export default ProgressScreen;