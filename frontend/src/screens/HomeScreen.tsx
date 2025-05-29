import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import * as Sentry from '@sentry/react-native';

import { RootState } from '../store';
import { fetchGoal } from '../store/slices/goalSlice';
import { fetchTodayStep } from '../store/slices/stepSlice';
import { formatDateRelative } from '../utils/dateUtils';
import styles from './HomeScreen.styles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { goal, loadingGoal, errorGoal } = useSelector((state: RootState) => state.goal);
  const { todayStep, loadingTodayStep, errorTodayStep } = useSelector((state: RootState) => state.step);
  const [refreshing, setRefreshing] = useState(false);

  const progressValue = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    if (goal) {
      const progress = Math.round(goal.completedSteps / goal.totalSteps * 100);
      progressValue.value = withTiming(progress, { duration: 1000 });
    }
  }, [goal]);

  const refreshData = async () => {
    setRefreshing(true);
    try {
      if (goal) {
        await Promise.all([
          dispatch(fetchGoal(goal.id)),
          dispatch(fetchTodayStep(goal.id)),
        ]);  
      }
    } catch (error) {
      console.error('Failed to refresh dashboard data', error);
      Sentry.captureException(error);
    }
    setRefreshing(false);
  };

  if (loadingGoal || loadingTodayStep) {
    return (
      <View style={styles.loadingContainer}>
        {/* TODO: Render skeleton loaders */}
      </View>
    );
  }

  if (errorGoal || errorTodayStep) {
    console.error('Failed to load dashboard data', errorGoal || errorTodayStep);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Oops! Something went wrong.</Text>
        <TouchableOpacity onPress={refreshData} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!goal) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>You don't have any active goals.</Text>
        <TouchableOpacity onPress={() => {/* TODO: Navigate to goal creation screen */}} style={styles.createGoalButton}>
          <Text style={styles.createGoalButtonText}>Create Goal</Text>  
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={goal.completedSteps / goal.totalSteps} color="#6C63FF" style={styles.progressBar} />
          <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
        </View>
        <Text style={styles.progressText}>{goal.completedSteps} / {goal.totalSteps} - {Math.round(goal.completedSteps / goal.totalSteps * 100)}%</Text>
      </View>

      <View style={styles.streakContainer}>
        <Text style={styles.streakLabel}>Current Streak</Text>  
        <Text style={styles.streakCount}>{goal.currentStreak} Days</Text>
      </View>

      <View style={styles.missionContainer}>
        <Text style={styles.missionTitle}>Today's Mission</Text>
        {todayStep ? (
          <>
            <Text style={styles.stepTitle}>{todayStep.title}</Text>
            <Text style={styles.stepDescription}>{todayStep.description}</Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statText}>Completed: {goal.completedSteps}</Text>
              <Text style={styles.statText}>Remaining: {goal.totalSteps - goal.completedSteps}</Text>
              <Text style={styles.statText}>Days Left: {formatDateRelative(goal.targetDate)}</Text>
            </View>
            <TouchableOpacity style={styles.startButton} onPress={() => {/* TODO */}}>
              <Text style={styles.startButtonText}>Start Mission</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.noStepText}>No task for today. Enjoy your day!</Text>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;