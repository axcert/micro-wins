import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import * as Haptics from 'expo-haptics';

import { RootState } from '../store';
import { completeTask, skipTask, swapTask } from '../store/slices/taskSlice';
import { fetchTask } from '../services/api/taskService';
import ExpandableSection from '../components/common/ExpandableSection';
import Button from '../components/common/Button';
import { colors, spacing, typography } from '../constants/theme';
import { Task } from '../types/TaskTypes';

type TaskCompletionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'TaskCompletion'>;

const TaskCompletionScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);
  const task = useSelector((state: RootState) => state.task.currentTask);
  const dispatch = useDispatch();
  const navigation = useNavigation<TaskCompletionScreenNavigationProp>();

  useEffect(() => {
    const loadTask = async () => {
      try {
        await dispatch(fetchTask());
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching task:', err);
        Alert.alert('Error', 'Failed to load task. Please try again.');
        navigation.goBack();
      }
    };

    loadTask();
  }, [dispatch, navigation]);

  const handleComplete = async () => {
    setIsCompleting(true);

    try {
      await dispatch(completeTask());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error completing task:', err);
      Alert.alert('Error', 'Failed to complete task. Please try again.');
    } finally {
      setIsCompleting(false);
    }
  };

  const handleSkip = async () => {
    try {
      await dispatch(skipTask());
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error skipping task:', err);
      Alert.alert('Error', 'Failed to skip task. Please try again.');
    }
  };

  const handleSwap = async () => {
    try {
      await dispatch(swapTask());
    } catch (err) {
      console.error('Error swapping task:', err);
      Alert.alert('Error', 'Failed to get alternative task. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: spacing.lg }}>
      <Text style={typography.h2}>{`Step ${task.order} of 100`}</Text>
      
      <View style={{ marginTop: spacing.lg }}>
        <Text style={typography.h3}>{task.title}</Text>
        <Text style={{ ...typography.body, marginTop: spacing.md }}>{task.description}</Text>
      </View>

      <ExpandableSection title="Tips">
        {task.tips.map((tip, index) => (
          <Text key={index} style={{ ...typography.body, marginTop: spacing.sm }}>
            {`\u2022 ${tip}`}
          </Text>
        ))}
      </ExpandableSection>

      <View style={{ marginTop: 'auto' }}>
        <Button
          title={isCompleting ? 'Completing...' : 'Complete'}
          onPress={handleComplete}
          disabled={isCompleting}
        />
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
          <TouchableOpacity onPress={() => Alert.alert('Skip Task', 'Are you sure you want to skip this task?', [
            { text: 'Cancel' },
            { text: 'Skip', onPress: handleSkip }
          ])}>
            <Text style={{ color: colors.text.secondary }}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSwap}>
            <Text style={{ color: colors.primary }}>Swap Task</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {isCompleting && (
        <LottieView
          source={require('../assets/animations/success.json')}
          autoPlay
          loop={false}
          onAnimationFinish={() => {
            setTimeout(() => {
              navigation.navigate('Home');  
            }, 2000);
          }}
          style={{
            width: 200,
            height: 200,
            position: 'absolute',
            alignSelf: 'center',
            top: '30%'
          }}
        />
      )}
    </View>
  );
};

export default TaskCompletionScreen;