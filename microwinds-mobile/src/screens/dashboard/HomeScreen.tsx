import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { fetchUserGoals, fetchTodaysStep } from '@/store/slices/goalSlice';
import { RootState, AppDispatch } from '@/store';
import { GoalType, MicroStepType } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import Button from '@/components/common/Button';
import SkeletonLoader from '@/components/common/SkeletonLoader';
import TodaysMissionCard from '@/components/goals/TodaysMissionCard';
import HomeEmptyState from './HomeEmptyState';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { goals, todaysStep, loading } = useSelector((state: RootState) => state.goals);
  const [refreshing, setRefreshing] = useState(false);

  const activeGoal = goals.find(g => g.status === 'active');
  const progressValue = useSharedValue(0);

  useEffect(() => {
    dispatch(fetchUserGoals());
    dispatch(fetchTodaysStep());
  }, [dispatch]);

  useEffect(() => {
    if (activeGoal) {
      progressValue.value = withTiming(activeGoal.progress, { duration: 1000 });
    } else {
      progressValue.value = withTiming(0, { duration: 500 });
    }
  }, [activeGoal, progressValue]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    Promise.all([
      dispatch(fetchUserGoals()),
      dispatch(fetchTodaysStep())  
    ]).finally(() => setRefreshing(false));
  }, [dispatch]);

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  if (!activeGoal && !loading) {
    return <HomeEmptyState onCreateGoal={() => navigation.navigate('CreateGoal')} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        {loading ? (
          <SkeletonLoader style={{ height: 120, borderRadius: 10 }} />
        ) : (
          <>
            <Text style={styles.goalTitle}>{activeGoal?.title || 'No Active Goal'}</Text>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, animatedProgressStyle]} />
            </View>
            <Text style={styles.progressText}>
              {activeGoal ? `${activeGoal.progress}% Complete` : 'No Progress'}
            </Text>
            <Text style={styles.streakText}>🔥 {activeGoal?.streak || 0} Day Streak</Text>
          </>
        )}
      </View>

      <TodaysMissionCard
        loading={loading}
        step={todaysStep}
        onPressStart={() => navigation.navigate('Task', { id: todaysStep?.id })} 
      />
      
      {activeGoal && (
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            ✅ {activeGoal.completedSteps} Completed
          </Text>
          <Text style={styles.statsText}>
            ⏳ {activeGoal.totalSteps - activeGoal.completedSteps} Remaining
          </Text>
          <Text style={styles.statsText}>
            📅 {activeGoal.daysRemaining} Days Left
          </Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <Button
          title="Create New Goal"
          onPress={() => navigation.navigate('CreateGoal')}
          style={styles.button}
        />
      </View>

      {loading && <ActivityIndicator style={styles.loadingSpinner} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xxl,
  },
  progressContainer: {
    marginBottom: spacing.xl,
  },
  goalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  progressBar: {
    height: 20,
    backgroundColor: colors.background.secondary,
    borderRadius: 10,
    marginBottom: spacing.sm,
    overflow: 'hidden',
  },
  progressFill: {
    backgroundColor: colors.primary,
    height: '100%',
    borderRadius: 10,
  },
  progressText: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'right',
  },
  streakText: {
    ...typography.body,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: spacing.sm,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  statsText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  buttonContainer: {
    marginTop: spacing.xl,
  },
  button: {
    marginBottom: spacing.lg,
  },
  loadingSpinner: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
  },
});