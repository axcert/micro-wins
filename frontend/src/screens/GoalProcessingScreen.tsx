import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGoal } from '../services/api/goalService';
import { RootState } from '../store';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { useFocusEffect } from '@react-navigation/native';

const GoalProcessingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const goal = useSelector((state: RootState) => state.goal.currentGoal);
  const isLoading = useSelector((state: RootState) => state.goal.isLoading);
  const error = useSelector((state: RootState) => state.goal.error);

  useFocusEffect(
    React.useCallback(() => {
      if (goal?.id) {
        const intervalId = setInterval(() => {
          dispatch(fetchGoal(goal.id, dispatch));
        }, 5000);

        return () => {
          clearInterval(intervalId);
        };
      }
    }, [goal?.id, dispatch])
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!goal) {
    return <Text>No goal found.</Text>;
  }

  if (goal.status === 'active') {
    // Navigate to goal details screen
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Processing Goal...</Text>
      <Text>Title: {goal.title}</Text>
      <Text>Category: {goal.category}</Text>
      <Text>Target Days: {goal.targetDays}</Text>
      <Text>Status: {goal.status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default GoalProcessingScreen;