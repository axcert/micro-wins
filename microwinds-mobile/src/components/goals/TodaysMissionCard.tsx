import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import { MicroStepType } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import SkeletonLoader from '@/components/common/SkeletonLoader';

interface TodaysMissionCardProps {
  step: MicroStepType | null;
  onPressStart: () => void;
  loading: boolean;
}

export default function TodaysMissionCard({ 
  step,
  onPressStart,
  loading 
}: TodaysMissionCardProps) {
  if (loading) {
    return (
      <Card containerStyle={styles.card}>
        <SkeletonLoader style={styles.skeleton} />
        <SkeletonLoader style={[styles.skeleton, { height: 20, marginTop: spacing.sm }]} />
        <SkeletonLoader style={[styles.skeleton, { height: 40, marginTop: spacing.lg }]} />
      </Card>
    );
  }

  if (!step) {
    return (
      <Card containerStyle={styles.card}>
        <Text style={styles.noStepText}>No mission for today. Enjoy your rest day!</Text>
      </Card>
    );
  }

  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.missionText}>Today's Mission</Text>
      <Text style={styles.stepTitle}>{step.title}</Text>
      <Text style={styles.stepDescription}>{step.description}</Text>
      
      <TouchableOpacity style={styles.startButton} onPress={onPressStart}>
        <Text style={styles.startButtonText}>Start Mission</Text>
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
  skeleton: {
    height: 16,
    borderRadius: 4,
    marginBottom: spacing.sm,
  },
  missionText: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  noStepText: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
  },
  stepTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  stepDescription: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
});