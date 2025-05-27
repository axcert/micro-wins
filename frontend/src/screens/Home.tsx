import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar } from 'react-native-paper';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { fetchGoalProgress, selectActiveGoal, selectTodaysTask } from '../store/goalSlice';
import { RootState } from '../store/store';
import EmptyState from '../components/EmptyState';

const Home = () => {
  const dispatch = useDispatch();
  const activeGoal = useSelector((state: RootState) => selectActiveGoal(state));
  const todaysTask = useSelector((state: RootState) => selectTodaysTask(state));
  const progressPercent = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${progressPercent.value}%`,
  }));

  useEffect(() => {
    dispatch(fetchGoalProgress());
  }, [dispatch]);

  useEffect(() => {
    if (activeGoal) {
      progressPercent.value = withTiming(activeGoal.progress, { duration: 1000 });
    }
  }, [activeGoal, progressPercent]);

  if (!activeGoal) {
    return <EmptyState message="No active goal. Let's create one!" />;
  }

  const onRefresh = () => {
    dispatch(fetchGoalProgress());
  };

  return (
    <View style={styles.container}>
      <RefreshControl refreshing={false} onRefresh={onRefresh}>
        <Text style={styles.goalTitle}>{activeGoal.title}</Text>
        
        <View style={styles.progressContainer}>
          <ProgressBar style={styles.progressBar} progress={activeGoal.progress / 100} color="#4a90e2" />
          <Animated.View style={[styles.progressFill, animatedStyle]} />
        </View>

        <Text style={styles.progressText}>{activeGoal.progress}%</Text>
        <Text style={styles.streakText}>Streak: {activeGoal.streak} days</Text>

        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Completed: {activeGoal.completedSteps}</Text>
          <Text style={styles.statText}>Remaining: {activeGoal.remainingSteps}</Text>
          <Text style={styles.statText}>Days Left: {activeGoal.daysLeft}</Text>
        </View>

        <View style={styles.missionCard}>
          <Text style={styles.missionTitle}>Today's 1% Mission</Text>
          <Text style={styles.missionDesc}>{todaysTask.description}</Text>

          <TouchableOpacity style={styles.missionButton}>
            <Text style={styles.missionButtonText}>Let's Go</Text>
          </TouchableOpacity>
        </View>
      </RefreshControl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  goalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressContainer: {
    height: 20, 
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: 20,
    borderRadius: 10,
  },
  progressFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#4a90e2',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,  
  },
  streakText: {
    color: '#4a90e2',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statText: {
    fontSize: 16,
  },
  missionCard: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
  },
  missionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  missionDesc: {
    marginBottom: 15,
    lineHeight: 22,
  },
  missionButton: {
    backgroundColor: '#4a90e2',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 12,  
  },
  missionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;