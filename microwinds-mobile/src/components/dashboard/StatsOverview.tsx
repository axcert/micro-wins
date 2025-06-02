import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { GoalType } from '@/types';

interface StatsOverviewProps {
  goal: GoalType;
}

export default function StatsOverview({ goal }: StatsOverviewProps) {
  const completedSteps = goal.microSteps.filter((step) => step.completed).length;
  const remainingSteps = goal.microSteps.length - completedSteps;
  const daysLeft = goal.targetDays - goal.currentDay;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Goal Overview</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{completedSteps}</Text>
          <Text style={styles.statLabel}>Steps Complete</Text>
        </View>

        <View style={[styles.statItem, styles.centerItem]}>
          <Text style={styles.statValue}>{remainingSteps}</Text>
          <Text style={styles.statLabel}>Steps Remaining</Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statValue}>{daysLeft}</Text>
          <Text style={styles.statLabel}>Days Left</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
  header: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  centerItem: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
  },
  statValue: {
    ...typography.h2,
    color: colors.text.primary,
  },
  statLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
});