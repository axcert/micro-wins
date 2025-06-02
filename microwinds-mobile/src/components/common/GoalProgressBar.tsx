import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors, spacing, typography } from '@/constants/theme';

interface GoalProgressBarProps {
  progress: number;
}

export default function GoalProgressBar({ progress }: GoalProgressBarProps) {
  const progressValue = useSharedValue(0);

  useEffect(() => {
    progressValue.value = withTiming(progress, { duration: 1000 });
  }, [progress, progressValue]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.progressBackground}>
        <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
      </View>
      <Text style={styles.progressText}>{Math.round(progress)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBackground: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.background.tertiary, 
    flex: 1,
    marginRight: spacing.md,
  },
  progressFill: {
    height: '100%',
    borderRadius: 5,
    backgroundColor: colors.secondary,
  },
  progressText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});