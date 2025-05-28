import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodaysTask, completeTask, skipTask, swapTask } from '../store/taskSlice';
import { PlayAnimation } from '../components/PlayAnimation';

const TodayScreen = () => {
  const dispatch = useDispatch();
  const { todaysTask, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTodaysTask());
  }, [dispatch]);

  const handleComplete = () => {
    dispatch(completeTask());
    // Show celebration animation
    PlayAnimation('celebration');
  };

  const handleSkip = () => {
    dispatch(skipTask());
  };

  const handleSwap = () => {
    dispatch(swapTask());
  };

  if (isLoading) {
    return (
      <View>
        <Text>Loading today's task...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Today's Task:</Text>
      <Text>{todaysTask.title}</Text>
      <Text>{todaysTask.description}</Text>
      <Button title="Complete" onPress={handleComplete} />
      <Button title="Skip" onPress={handleSkip} />
      <Button title="Swap" onPress={handleSwap} />
    </View>
  );
};

export default TodayScreen;