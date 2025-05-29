import React from 'react';
import { View, Text, TouchableOpacity, RefreshControl, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import ProgressBar from '../components/ProgressBar';
import StreakCounter from '../components/StreakCounter';
import TodaysMission from '../components/TodaysMission';
import QuickStats from '../components/QuickStats';
import { fetchGoalProgress, fetchTodaysTask } from '../redux/goalSlice';
import tw from 'tailwind-react-native-classnames';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { currentGoal, goalProgress, todaysTask, isLoading } = useSelector(state => state.goal);
  
  const progressValue = useSharedValue(0);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressValue.value}%`,
    };
  });

  React.useEffect(() => {
    dispatch(fetchGoalProgress());
    dispatch(fetchTodaysTask());
  }, [dispatch]);

  React.useEffect(() => {
    if (goalProgress) {
      progressValue.value = withTiming(goalProgress, { duration: 1000 });
    }
  }, [goalProgress]);

  const onRefresh = () => {
    dispatch(fetchGoalProgress());
    dispatch(fetchTodaysTask());
  };

  if (!currentGoal) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={tw`text-lg text-gray-500`}>No active goal</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={tw`flex-1 p-4`}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={onRefresh} />
      }
    >
      <Text style={tw`text-2xl font-bold mb-4`}>{currentGoal.title}</Text>
      
      <ProgressBar progress={progressStyle} />
      
      <StreakCounter streak={currentGoal.currentStreak} />
      
      <TodaysMission task={todaysTask} />

      <QuickStats 
        completed={currentGoal.completedTasks}
        remaining={100 - currentGoal.completedTasks}
        daysLeft={currentGoal.daysLeft}
      />

      <TouchableOpacity 
        style={tw`bg-blue-500 py-3 px-4 rounded-lg mt-4`}
        onPress={() => console.log('Start mission')}
      >
        <Text style={tw`text-white text-lg font-bold text-center`}>Start Mission</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HomeScreen;