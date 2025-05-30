import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { VictoryLine, VictoryPie, VictoryTheme } from 'victory-native';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import { format, subDays } from 'date-fns';
import Share from 'react-native-share';
import { colors, spacing, typography } from '@/constants/theme';
import { RootState } from '@/store';

const sampleData = [
  // Sample progress data
  { date: subDays(new Date(), 4), count: 1 },
  { date: subDays(new Date(), 3), count: 2 },
  { date: subDays(new Date(), 2), count: 3 },
  { date: subDays(new Date(), 1), count: 1 },
  { date: new Date(), count: 2 },
];

export default function ProgressScreen() {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month'>('month');
  const { goals, completionData, streakData } = useSelector((state: RootState) => ({
    goals: state.goals.goals,
    completionData: state.progress.completionData,
    streakData: state.progress.streakData,
  }));

  const handleRangeChange = (range: 'week' | 'month') => {
    setSelectedRange(range);
  };

  const handleExportData = async () => {
    try {
      // Export progress data logic
      const shareOptions = {
        title: 'Share Progress Report',
        message: 'Check out my MicroWins goal progress!',
        url: 'TODO: generate image URL of progress',
        subject: 'MicroWins Progress Report',
      };
      await Share.open(shareOptions);
    } catch (error) {
      console.error('Error sharing progress:', error);
    }
  };

  const renderCalendarHeatmap = () => (
    <CalendarHeatmap
      endDate={new Date()}
      numDays={selectedRange === 'week' ? 7 : 30}
      values={sampleData}
      colorScale={['#EBEDF0', colors.primary]}
      showOutOfRangeDays={false}
      tooltipDataAttrs={(value: any) => {
        return {
          'data-tooltip': `${value.count} steps on ${format(value.date, 'MMM d')}`,
        };
      }}
    />
  );

  const renderStreakCard = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>🔥 Streak</Text>
      <Text style={styles.streakNumber}>{streakData.currentStreak}</Text>
      <Text style={styles.streakLabel}>Current Streak</Text>
      <Text style={[styles.streakNumber, { marginTop: spacing.md }]}>
        {streakData.bestStreak}
      </Text>
      <Text style={styles.streakLabel}>Best Streak</Text>
    </View>
  );

  const renderCompletionChart = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>✅ Completion Rate</Text>
      <VictoryPie
        data={[
          { x: 'Completed', y: completionData.completedPercentage },
          { x: 'Remaining', y: 100 - completionData.completedPercentage },
        ]}
        colorScale={[colors.primary, colors.background.secondary]}
        innerRadius={64}
        labelRadius={({ innerRadius }: any) => innerRadius + 24}
        style={{
          labels: {
            fill: colors.text.secondary,
            ...typography.body,
            fontWeight: '600',
          },
        }}
      />
    </View>
  );

  const renderProgressChart = () => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>📈 Progress</Text>
      <VictoryLine
        data={completionData.progressOverTime}
        x="date"
        y="count"
        theme={VictoryTheme.material}
        style={{
          data: { stroke: colors.primary, strokeWidth: 2 },
        }}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Progress &amp; Analytics</Text>

      <View style={styles.dateRangeContainer}>
        <TouchableOpacity
          style={[
            styles.dateRangeButton,
            selectedRange === 'week' && styles.activeButton,
          ]}
          onPress={() => handleRangeChange('week')}
        >
          <Text
            style={[
              styles.dateRangeLabel,
              selectedRange === 'week' && styles.activeLabel,
            ]}
          >
            Week
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dateRangeButton,
            selectedRange === 'month' && styles.activeButton,
          ]}
          onPress={() => handleRangeChange('month')}
        >
          <Text
            style={[
              styles.dateRangeLabel,
              selectedRange === 'month' && styles.activeLabel,
            ]}
          >
            Month
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Daily Progress</Text>
      {renderCalendarHeatmap()}

      <View style={styles.cardRow}>
        {renderStreakCard()}
        {renderCompletionChart()}
      </View>
      
      {renderProgressChart()}
      
      <TouchableOpacity style={styles.exportButton} onPress={handleExportData}>
        <Text style={styles.exportButtonLabel}>Export Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
    padding: spacing.md,
  },
  heading: {
    ...typography.h2,
    marginBottom: spacing.md,
  },
  dateRangeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  dateRangeButton: {
    flex: 1,
    padding: spacing.sm,
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.sm,
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: colors.primary,
  },
  dateRangeLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  activeLabel: {
    color: colors.background.primary,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginVertical: spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: colors.background.primary,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    margin: spacing.xs,
    alignItems: 'center',
    ...shadows.medium,
  },
  cardTitle: {
    ...typography.h4,
    marginBottom: spacing.md,
  },
  streakNumber: {
    ...typography.h1,
    color: colors.primary,
  },
  streakLabel: {
    ...typography.bodySmall,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  exportButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.xl,
    alignSelf: 'center',
  },  
  exportButtonLabel: {
    ...typography.button,
    color: colors.background.primary,
  },
};