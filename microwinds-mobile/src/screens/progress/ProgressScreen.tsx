```tsx
import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchDashboardData, fetchStreakData, fetchTimelineData } from '@/store/slices/progressSlice';
import { RootState } from '@/store';
import { colors, spacing, typography } from '@/constants/theme';
import ScreenContainer from '@/components/common/ScreenContainer';
import CalendarHeatmap from '@/components/progress/CalendarHeatmap';
import ProgressStatCard from '@/components/progress/ProgressStatCard';
import { ProgressTabParamList } from '@/types';
import { ProgressStackNavigationProp } from '@/types/navigation';

export default function ProgressScreen({ 
  navigation 
}: ProgressStackNavigationProp<'Progress'>) {
  const dispatch = useDispatch();
  const { dashboard, streaks, timeline } = useSelector((state: RootState) => state.progress);
  const [range, setRange] = useState<'week' | 'month'>('month');

  useEffect(() => {
    dispatch(fetchDashboardData());
    dispatch(fetchStreakData());
    dispatch(fetchTimelineData(range));
  }, [dispatch, range]);

  const renderTitle = () => (
    <Text style={styles.title}>
      Your <Text style={styles.highlight}>Progress</Text>
    </Text>  
  );

  const renderStreaks = () => (
    <View style={styles.streakContainer}>
      <ProgressStatCard
        label="Current Streak"
        value={streaks.currentStreak}
        icon="calendar"
        style={styles.streakCard}
      />
      <ProgressStatCard
        label="Best Streak"
        value={streaks.bestStreak}
        icon="trophy"
        style={styles.streakCard}
      />
    </View>
  );

  const renderTimeline = () => (
    <View style={styles.timelineContainer}>
      <View style={styles.timelineHeader}>
        <Text style={styles.timelineTitle}>Timeline</Text>
        <View style={styles.timelineRangeContainer}>
          <TouchableOpacity
            style={[
              styles.timelineRangeButton,
              range === 'week' && styles.activeRangeButton,
            ]}
            onPress={() => setRange('week')}
          >
            <Text
              style={[
                styles.timelineRangeButtonText,
                range === 'week' && styles.activeRangeButtonText,
              ]}
            >
              Week
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.timelineRangeButton,
              range === 'month' && styles.activeRangeButton,
            ]}
            onPress={() => setRange('month')}
          >
            <Text
              style={[
                styles.timelineRangeButtonText,
                range === 'month' && styles.activeRangeButtonText,
              ]}
            >
              Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <VictoryChart width={350} height={220} theme={VictoryTheme.material}>
        <VictoryAxis
          style={{
            axis: { stroke: colors.text.secondary },
            axisLabel: { fontSize: 16, fill: colors.text.secondary },
            tickLabels: { fontSize: 12, fill: colors.text.secondary },
          }}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: colors.text.secondary },
            axisLabel: { fontSize: 16, fill: colors.text.secondary },
            tickLabels: { fontSize: 12, fill: colors.text.secondary },
            grid: { stroke: colors.divider },
          }}
          tickFormat={(x) => `${x}%`}
        />
        <VictoryBar
          data={timeline}
          x="date"
          y="progress"
          style={{
            data: {
              fill: ({ datum }) =>
                datum.progress >= 80
                  ? colors.success
                  : datum.progress >= 40
                  ? colors.primary
                  : colors.error,
            },
          }}
          alignment="middle"
          barRatio={0.8}
          cornerRadius={4}
        />
      </VictoryChart>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsContainer}>
      <ProgressStatCard
        label="Total Goals"
        value={dashboard.totalGoals}
        icon="bullseye"
        style={styles.statCard}
      />
      <ProgressStatCard
        label="Completed Goals"
        value={dashboard.completedGoals}
        icon="checkmark-circle"
        style={styles.statCard}
      />
      <ProgressStatCard
        label="Completion Rate"
        value={`${dashboard.completionRate}%`}
        icon="pie-chart"
        style={styles.statCard}
      />
      <ProgressStatCard
        label="Total Steps"
        value={dashboard.totalSteps}
        icon="footsteps"
        style={styles.statCard}
      />
    </View>
  );

  const renderHeatMap = () => (
    <View style={styles.heatmapContainer}>
      <Text style={styles.heatmapTitle}>Daily Progress</Text>
      <CalendarHeatmap data={dashboard.heatmap} />
    </View>
  );

  const renderExportButton = () => (
    <TouchableOpacity
      style={styles.exportButton}
      onPress={() => navigation.navigate('ExportProgress')}
    >
      <Icon name="download" size={24} color={colors.primary} />
      <Text style={styles.exportButtonText}>Export Progress</Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer scrollable>
      <ScrollView contentContainerStyle={styles.container}>
        {renderTitle()}
        {renderStreaks()}
        {renderTimeline()}
        {renderStats()}
        {renderHeatMap()}
        {renderExportButton()}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.h1,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  highlight: {
    color: colors.primary,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  streakCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  timelineContainer: {
    marginBottom: spacing.lg,
  },
  timelineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  timelineTitle: {
    ...typography.h2,
  },
  timelineRangeContainer: {
    flexDirection: 'row',
  },
  timelineRangeButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: spacing.sm,
    marginLeft: spacing.sm,
    backgroundColor: colors.background.secondary,
  },
  activeRangeButton: {
    backgroundColor: colors.primary,
  },
  timelineRangeButtonText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  activeRangeButtonText: {
    color: colors.text.inverse,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '48%',
    marginBottom: spacing.md,
  },
  heatmapContainer: {
    marginBottom: spacing.lg,
  },
  heatmapTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  exportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
    backgroundColor: colors.background.secondary,
  },
  exportButtonText: {
    ...typography.button,
    marginLeft: spacing.sm,
  },
});
```