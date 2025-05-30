import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressCircle } from 'react-native-svg-charts';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootState } from '@/store';
import { fetchActiveGoal, fetchTodaysStep } from '@/store/slices/goalSlice';
import { colors, spacing, typography } from '@/constants/theme';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { activeGoal, todaysStep } = useSelector((state: RootState) => state.goals);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    // Fetch active goal and today's step on mount
    dispatch(fetchActiveGoal());
    dispatch(fetchTodaysStep());
  }, [dispatch]);

  useEffect(() => {
    if (activeGoal) {
      // Animate progress bar
      progressValue.value = withTiming(activeGoal.progress / 100, { duration: 1000 });
    } else {
      progressValue.value = withTiming(0, { duration: 500 });
    }
  }, [activeGoal, progressValue]);

  const progressStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progressValue.value * 360}deg` }]
  }));

  const handleStartMission = () => {
    // Navigate to task screen
  };

  const renderGoalCard = () => {
    if (!activeGoal) {
      return (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No active goal</Text>
          <TouchableOpacity style={styles.emptyStateButton}>
            <Text style={styles.emptyStateButtonText}>Create Goal</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={styles.goalCard}>
        <Text style={styles.goalTitle}>{activeGoal.title}</Text>
        <View style={styles.progressContainer}>
          <ProgressCircle 
            style={styles.progressCircle}
            progress={activeGoal.progress / 100}
            progressColor={colors.primary}
            backgroundColor={colors.background.secondary}
            strokeWidth={8}
          />
          <Animated.View style={[styles.progressPointer, progressStyle]} />
          <Text style={styles.progressText}>{activeGoal.progress}%</Text>
        </View>
        <View style={styles.quickStats}>
          <Text>
            <Text style={styles.statNumber}>{activeGoal.totalSteps - activeGoal.completedSteps}</Text>
            <Text style={styles.statLabel}> remaining</Text>
          </Text>
          <Text>
            <Text style={styles.statNumber}>{activeGoal.dayStreak}</Text>
            <Text style={styles.statLabel}> day streak</Text>  
          </Text>
        </View>
      </View>
    );
  };

  const renderTodaysMission = () => {
    if (!todaysStep) {
      return null;
    }

    return (
      <View style={styles.missionContainer}>
        <Text style={styles.missionTitle}>Today's Mission</Text>
        <View style={styles.missionCard}>
          <View style={styles.missionIconContainer}>
            <Icon name="rocket" size={32} color={colors.primary} />  
          </View>
          <View style={styles.missionDetails}>
            <Text style={styles.missionText}>{todaysStep.title}</Text>
            <Text style={styles.missionDescription}>{todaysStep.description}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.startButton} onPress={handleStartMission}>
          <Text style={styles.startButtonText}>Start Mission</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={() => {
            dispatch(fetchActiveGoal());
            dispatch(fetchTodaysStep());
          }}
        />
      }
    >
      {renderGoalCard()}
      {renderTodaysMission()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  contentContainer: {
    flexGrow: 1,
    padding: spacing.lg,
  },
  goalCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  goalTitle: {
    ...typography.h3,
    marginBottom: spacing.md,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressCircle: {
    height: 150,
    width: 150,
  },
  progressPointer: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
  },
  progressText: {
    ...typography.h2,
    color: colors.primary,
    marginTop: spacing.sm,
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statNumber: {
    ...typography.h4,
    color: colors.primary,
  },
  statLabel: {
    ...typography.body,
    color: colors.text.secondary,
  },
  missionContainer: {
    marginBottom: spacing.lg,
  },
  missionTitle: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  missionCard: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.md,
    padding: spacing.lg,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  missionIconContainer: {
    backgroundColor: colors.background.tertiary,
    borderRadius: spacing.md,
    padding: spacing.md,
    marginRight: spacing.lg,
  },
  missionDetails: {
    flex: 1,
  },  
  missionText: {
    ...typography.h4,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  missionDescription: {
    ...typography.body,
    color: colors.text.secondary,
  },
  startButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  startButtonText: {
    ...typography.button,
    color: colors.background.primary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  emptyStateText: {
    ...typography.h3,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  emptyStateButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: spacing.sm,
  },
  emptyStateButtonText: {
    ...typography.button,
    color: colors.background.primary,
  },
});