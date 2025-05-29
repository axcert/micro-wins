import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { RootState } from '../store';
import { updateTask, swapTask } from '../store/slices/goalSlice';
import * as stepService from '../services/api/stepService';
import * as Haptics from 'expo-haptics';
import styles from './TaskScreen.styles';
import { RouteParams } from '../navigation/RouteParams';
import SwapTaskModal from '../components/SwapTaskModal';
import Sentry from '@sentry/react-native';

type Props = StackScreenProps<RouteParams, 'Task'>;

const TaskScreen: React.FC<Props> = ({ navigation, route }) => {
  const { taskId } = route.params;
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [successAnimationProgress] = useState(new Animated.Value(0));
  const activeGoal = useSelector((state: RootState) => state.goals.activeGoal);
  const totalSteps = activeGoal?.steps.length ?? 0;
  const currentStep = activeGoal?.steps.find(step => step.id === taskId);
  const currentStepIndex = activeGoal?.steps.findIndex(step => step.id === taskId);

  useEffect(() => {
    const startTime = Date.now();

    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      Sentry.addBreadcrumb({
        category: 'task-screen',
        message: `User spent ${timeSpent}ms on task screen`,
        level: Sentry.Severity.Info,
      });
    };
  }, []);

  if (!currentStep) {
    return null;
  }

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await stepService.markStepCompleted(taskId);
      dispatch(updateTask({ taskId, completed: true }));
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      playSuccessAnimation();
    } catch (error) {
      console.error('Failed to mark task as completed', error);
      Sentry.captureException(error);
      // TODO: show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = async () => {
    // TODO: implement skip logic
    console.log('Skip');
  };

  const handleSwap = () => {
    setShowSwapModal(true);
  };

  const confirmSwap = async () => {
    setShowSwapModal(false);
    setIsLoading(true);

    try {
      const newStep = await stepService.swapStep(taskId);
      dispatch(swapTask({ oldTaskId: taskId, newTask: newStep }));
    } catch (error) {
      console.error('Failed to swap task', error);
      Sentry.captureException(error);
      // TODO: show error message
    } finally {
      setIsLoading(false);
    }
  };

  const playSuccessAnimation = () => {
    Animated.timing(successAnimationProgress, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      successAnimationProgress.setValue(0);
      navigation.navigate('Home');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.stepNumber}>{currentStepIndex + 1} / {totalSteps}</Text>
      <Text style={styles.title}>{currentStep.title}</Text>
      <Text style={styles.description}>{currentStep.description}</Text>
      
      {/* TODO: Tips expandable section */}

      <TouchableOpacity 
        style={[styles.button, styles.completeButton]}
        onPress={handleComplete}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Completing...' : 'Complete'}  
        </Text>
      </TouchableOpacity>

      <View style={styles.extraOptions}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.extraOptionText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSwap}>
          <Text style={styles.extraOptionText}>Swap</Text>
        </TouchableOpacity>
      </View>

      <SwapTaskModal 
        isVisible={showSwapModal}
        onConfirm={confirmSwap}
        onCancel={() => setShowSwapModal(false)}
      />

      <LottieView
        source={require('../assets/lottie/success.json')}
        style={styles.successAnimation}
        progress={successAnimationProgress}
        loop={false}
      />
    </View>
  );
};

export default TaskScreen;