import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import { fetchTodaysStep, fetchUserGoals } from '@/store/slices/goalSlice';
import { RootState } from '@/store';
import GoalProgressBar from '@/components/common/GoalProgressBar';
import TodaysMissionCard from '@/components/dashboard/TodaysMissionCard';
import StatsOverview from '@/components/dashboard/StatsOverview';
import { colors, spacing, typography } from '@/constants/theme';
import EmptyGoalsPlaceholder from '@/components/goals/EmptyGoalsPlaceholder';

type HomeScreenProps = StackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const dispatch = useDispatch();
  const { activeGoal, todaysStep, isLoading } = useSelector((state: RootState) => ({
    activeGoal: state.goals.activeGoal,
    todaysStep: state.goals.todaysStep,
    isLoading: state.goals.loading,
  }));
  
  const rotateValue = useSharedValue(0);

  const refreshData = useCallback(() => {
    dispatch(fetchUserGoals());
    dispatch(fetchTodaysStep());
  }, [dispatch]);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const rotateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: `${rotateValue.value}deg`,
        },
      ],
    };
  });

  const startLoadingAnimation = useCallback(() => {
    rotateValue.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
  }, [rotateValue]);

  const stopLoadingAnimation = useCallback(() => {
    rotateValue.value = withTiming(0);
  }, [rotateValue]);

  useEffect(() => {
    if (isLoading) {
      startLoadingAnimation();
    } else {
      stopLoadingAnimation();
    }
  }, [isLoading, startLoadingAnimation, stopLoadingAnimation]);

  if (!activeGoal) {
    return (
      <View style={styles.container}>
        <EmptyGoalsPlaceholder onCreateGoal={() => navigation.navigate('CreateGoal')} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
        }
      >
        <Text style={styles.title}>{activeGoal.title}</Text>

        <GoalProgressBar progress={activeGoal.progress} />

        <View style={styles.streakContainer}>
          <Animated.View style={[styles.refreshIcon, rotateStyle]}>
            {/* Refresh Icon */}
          </Animated.View>
          <Text style={styles.streakText}>{activeGoal.streak} Day Streak</Text>
        </View>

        {todaysStep && (
          <TodaysMissionCard
            step={todaysStep}
            onStartMission={() => navigation.navigate('Task')}
          />
        )}

        <StatsOverview goal={activeGoal} />
      </Animated.ScrollView>

      <TouchableOpacity
        style={styles.createGoalButton}
        onPress={() => navigation.navigate('CreateGoal')}
      >
        <Text style={styles.createGoalButtonText}>+ Add New Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  refreshIcon: {
    marginRight: spacing.sm,
  },
  streakText: {
    ...typography.h4,
    color: colors.primary,
  },
  createGoalButton: {
    backgroundColor: colors.secondary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  createGoalButtonText: {
    ...typography.button,
    color: colors.background.primary,
  },
});