import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { shadows } from '@/constants/theme';
import { MicroStepType } from '@/types';

interface TodaysMissionCardProps {
  step: MicroStepType;
  onStartMission: () => void;
}

export default function TodaysMissionCard({ step, onStartMission }: TodaysMissionCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's 1% Mission</Text>
      
      <View style={styles.content}>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description} numberOfLines={2}>{step.description}</Text>
      </View>

      <TouchableOpacity style={styles.startButton} onPress={onStartMission}>
        <Text style={styles.startButtonText}>Start Mission</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.medium,
  },
  header: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  content: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.button,
    color: colors.background.primary,
  },
});