import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import SkeletonContent from 'react-native-skeleton-content';
import { RootState } from '@/store';
import { fetchDashboardData, setActiveGoal } from '@/store/slices/dashboardSlice';
import { colors, spacing, typography } from '@/constants/theme';
import ProgressRing from '@/components/common/ProgressRing';
import MissionCard from '@/components/dashboard/MissionCard';
import StatCard from '@/components/dashboard/StatCard';
import EmptyState from '@/components/common/EmptyState';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const { dashboardData, activeGoal, loading } = useSelector((state: RootState) => state.dashboard);
  const [refreshing, setRefreshing] = useState(false);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (activeGoal) {
      progressValue.value = withTiming(activeGoal.progress, { duration: 1000 });
    }
  }, [activeGoal, progressValue]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchDashboardData());
    setRefreshing(false);
  };

  const handleStartMission = () => {
    // Navigate to Task screen
  };

  const handleEditGoal = () => {
    // Navigate to Edit Goal screen
  };

  const animatedProgressStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progressValue.value * 3.6}deg` }],
    };
  });

  if (!activeGoal) {
    return (
      <EmptyState
        title="No Active Goal"
        message="Start your first goal to see your progress here."
        buttonText="Create Goal"
        onButtonPress={() => {}}
      />
    );
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
      }
    >
      <SkeletonContent
        containerStyle={styles.goalHeader}
        isLoading={loading}
        layout={[
          { key: 'goalTitle', width: '70%', height: 32, marginBottom: spacing.sm },
          { key: 'goalCategory', width: '30%', height: 24, marginBottom: spacing.sm },
          { key: 'goalDays', width: '50%', height: 20 },
        ]}
      >
        <Text style={styles.goalTitle} numberOfLines={1}>
          {activeGoal.title}
        </Text>
        <View style={styles.goalCategory}>
          <Icon name="folder" color={colors.primary} />
          <Text style={styles.goalCategoryText}>{activeGoal.category}</Text>
        </View>
        <Text style={styles.goalDays}>
          Day {activeGoal.currentDay} of {activeGoal.targetDays}
        </Text>
        <TouchableOpacity onPress={handleEditGoal} style={styles.editButton}>
          <Icon name="create" color={colors.text.secondary} size={20} />
        </TouchableOpacity>
      </SkeletonContent>

      <SkeletonContent
        containerStyle={styles.progressContainer}
        isLoading={loading}
        layout={[{ key: 'progressRing', width: 200, height: 200, borderRadius: 100 }]}
      >
        <ProgressRing progress={activeGoal.progress} size={200} strokeWidth={20} animatedStyle={animatedProgressStyle}>
          <Text style={styles.progressText}>{Math.round(activeGoal.progress)}%</Text>
        </ProgressRing>
      </SkeletonContent>

      <SkeletonContent
        containerStyle={styles.streakContainer}
        isLoading={loading}
        layout={[
          { key: 'streakIcon', width: 40, height: 40, marginRight: spacing.sm },
          { key: 'streakCount', width: 60, height: 40 },
        ]}
      >
        <View style={styles.streakIcon}>
          <Icon name="flame" color={colors.secondary} size={40} />
        </View>
        <Text style={styles.streakCount}>{activeGoal.streak}</Text>
      </SkeletonContent>

      <SkeletonContent
        containerStyle={styles.missionContainer}
        isLoading={loading}
        layout={[
          { key: 'missionHeader', width: '100%', height: 32, marginBottom: spacing.md },
          { key: 'missionTitle', width: '100%', height: 24, marginBottom: spacing.sm },
          { key: 'missionDescription', width: '100%', height: 20, marginBottom: spacing.lg },
          { key: 'missionButton', width: '100%', height: 48 },
        ]}
      >
        <MissionCard
          stepNumber={activeGoal.currentStep.number}
          totalSteps={activeGoal.totalSteps}
          title={activeGoal.currentStep.title}
          description={activeGoal.currentStep.description}
          onPress={handleStartMission}
        />
      </SkeletonContent>

      <SkeletonContent
        containerStyle={styles.statsContainer}
        isLoading={loading}
        layout={[
          {
            key: 'statsRow',
            flexDirection: 'row',
            children: [
              { width: 100, height: 100, marginRight: spacing.sm },
              { width: 100, height: 100, marginRight: spacing.sm },
              { width: 100, height: 100 },
            ],
          },
        ]}
      >
        <ScrollView horizontal contentContainerStyle={styles.statsRow}>
          <StatCard
            icon="checkmark-circle"
            label="Completed"
            value={dashboardData.completedSteps}
            iconColor={colors.success}
          />
          <StatCard 
            icon="calendar" 
            label="Days Left"
            value={activeGoal.daysRemaining}
            iconColor={colors.warning}
          />
          <StatCard
            icon="trending-up"
            label="Avg Rate"
            value={`${dashboardData.avgCompletionRate}%`}
            iconColor={colors.primary}
          />
        </ScrollView>
      </SkeletonContent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
  goalHeader: {
    marginBottom: spacing.xl,
  },
  goalTitle: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  goalCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  goalCategoryText: {
    ...typography.body,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  goalDays: {
    ...typography.body,
    color: colors.text.secondary,
  },
  editButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: spacing.sm,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  progressText: {
    ...typography.h1,
    color: colors.primary,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  streakIcon: {
    marginRight: spacing.sm,
  },
  streakCount: {
    ...typography.h2,
    color: colors.secondary,
  },
  missionContainer: {
    marginBottom: spacing.xl,
  },
  statsContainer: {
    marginBottom: spacing.lg,
  },
  statsRow: {
    paddingVertical: spacing.md,
  },
});