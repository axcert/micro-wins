import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { RootState } from '../store';
import { fetchGoalSummary, fetchTodaysTask } from '../store/slices/goalSlice';
import { Goal, MicroStep } from '../types/GoalTypes';
import { colors, typography } from '../constants/theme';
import ProgressBar from '../components/ProgressBar';
import SkeletonLoader from '../components/SkeletonLoader';

interface DashboardScreenProps {
  navigation: StackNavigationProp<any, 'Dashboard'>;
  route: RouteProp<any, 'Dashboard'>;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const dispatch = useDispatch();
  const goal = useSelector((state: RootState) => state.goal.activeGoal);
  const todaysTask = useSelector((state: RootState) => state.goal.todaysTask);
  const goalProgress = useSelector((state: RootState) => state.goal.goalProgress);
  const streak = useSelector((state: RootState) => state.goal.currentStreak);

  const progressValue = useSharedValue(0);
  
  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchGoalSummary() as any);
    dispatch(fetchTodaysTask() as any);
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (goalProgress) {
      progressValue.value = withTiming(goalProgress, { duration: 500 });
    } else {
      progressValue.value = withTiming(0, { duration: 500 });
    }
  }, [goalProgress, progressValue]);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetchGoalSummary() as any);
    dispatch(fetchTodaysTask() as any);
    setIsRefreshing(false);
  }, [dispatch]);

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No active goal found.</Text>
      <TouchableOpacity style={styles.createGoalButton} onPress={() => navigation.navigate('CreateGoal')}>
        <Text style={styles.createGoalButtonText}>Create Goal</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <SkeletonLoader />
      </View>  
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView 
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {goal ? (
          <>
            <View style={styles.goalSection}>
              <Text style={styles.goalTitle}>{goal.title}</Text>
              <View style={styles.progressContainer}>
                <ProgressBar style={progressStyle} />
                <Text style={styles.progressText}>{goalProgress}%</Text>
              </View>
              <View style={styles.streakContainer}>
                <Text style={styles.streakText}>🔥 {streak} Day Streak</Text>
              </View>
            </View>
            
            <View style={styles.missionSection}>
              <Text style={styles.missionTitle}>Today's Mission</Text>
              {todaysTask ? (
                <View style={styles.missionCard}>
                  <Text style={styles.missionText}>{todaysTask.title}</Text>
                  
                  <View style={styles.statsContainer}>
                    <Text style={styles.statsText}>🎯 {goal.microSteps.filter(step => step.completed_at).length}/{goal.target_days}</Text>
                    <Text style={styles.statsText}>📅 {goal.target_days - goal.microSteps.filter(step => step.completed_at).length} Days Left</Text>
                  </View>

                  <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('TaskDetails')}>
                    <Text style={styles.startButtonText}>Start Mission</Text>  
                  </TouchableOpacity>
                </View>
              ) : (
                <Text>No task for today. Enjoy your rest day!</Text>
              )}
            </View>
          </>
        ) : renderEmptyState()}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: 20,
  },
  goalSection: {
    marginBottom: 30,
  },
  goalTitle: {
    ...typography.h1,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressText: {
    ...typography.body,
    color: colors.text.secondary,
    marginLeft: 10,
  },
  streakContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  streakText: {
    ...typography.body,
    color: colors.background.primary,
  },
  missionSection: {
    marginBottom: 30,
  },
  missionTitle: {
    ...typography.h2,
    marginBottom: 10,
  },
  missionCard: {
    backgroundColor: colors.background.card,
    borderRadius: 10,
    padding: 20,
  },
  missionText: {
    ...typography.body,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  startButtonText: {
    ...typography.body,
    color: colors.background.primary,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    ...typography.body,
    marginBottom: 20,
  },
  createGoalButton: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  createGoalButtonText: {
    ...typography.body,  
    color: colors.background.primary,
    fontWeight: 'bold',
  }
});

export default DashboardScreen;