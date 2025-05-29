import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTask, markTaskCompleted, markTaskSkipped, swapOutTask, selectDailyTask, selectIsLoading, selectError } from '../store/slices/dailyTaskSlice';
import Button from '../components/common/Button';
import * as Animatable from 'react-native-animatable';
import ErrorBoundary from '../components/common/ErrorBoundary';
import * as Sentry from '@sentry/react-native';

const DailyTaskScreen: React.FC = () => {
  const dispatch = useDispatch();
  const dailyTask = useSelector(selectDailyTask);
  const isLoadingTask = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const handleComplete = async () => {
    if (dailyTask) {
      dispatch(markTaskCompleted(dailyTask.id));
    }
  };

  const handleSkip = async () => {
    if (dailyTask) {  
      dispatch(markTaskSkipped(dailyTask.id));
    }
  };

  const handleSwap = async () => {
    if (dailyTask) {
      dispatch(swapOutTask(dailyTask.id));
    }
  };

  if (isLoadingTask) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    // Log screen errors to Sentry
    Sentry.captureMessage(`DailyTaskScreen Error: ${error}`);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <View style={styles.container}>
        {dailyTask ? (
          <Animatable.View animation="fadeIn" style={styles.taskContainer}>
            <Text style={styles.title}>{dailyTask.title}</Text>
            <Text style={styles.description}>{dailyTask.description}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Complete" onPress={handleComplete} />
              <Button title="Skip" onPress={handleSkip} />
              <Button title="Swap" onPress={handleSwap} />
            </View>
          </Animatable.View>
        ) : (
          <Text style={styles.noTaskText}>No task for today</Text>  
        )}
      </View>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  taskContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  noTaskText: {
    fontSize: 18,
  },
});

export default DailyTaskScreen;