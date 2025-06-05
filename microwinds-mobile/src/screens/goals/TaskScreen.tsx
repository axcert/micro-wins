import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { ProgressBar, Button, Icon } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { RootState } from '@/store';
import { completeStep, skipStep, swapStep } from '@/store/slices/goalSlice';
import { MicroStep } from '@/types';
import { colors, spacing, typography } from '@/constants/theme';
import { logTaskCompletion, logTaskSkip, logTaskSwap } from '@/services/analytics';
import { hapticFeedback } from '@/utils/haptics';
import Markdown from '@/components/common/Markdown';

type Props = StackScreenProps<RootStackParamList, 'Task'>;

export default function TaskScreen({ route, navigation }: Props) {
  const { goalId, stepId } = route.params;
  const dispatch = useDispatch();
  
  const [isCompleting, setIsCompleting] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);
  const [skipReason, setSkipReason] = useState('');
  const [showTips, setShowTips] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  
  const goal = useSelector((state: RootState) => 
    state.goals.goals.find(g => g.id === goalId)
  );
  const step = goal?.microSteps.find(s => s.id === stepId);
  
  const progress = useSelector((state: RootState) => state.goals.progress[goalId]) || 0;
  const streak = useSelector((state: RootState) => state.progress.streaks[goalId]) || 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prevTime => prevTime + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const handleComplete = useCallback(async () => {
    if (!step) return;
    
    try {
      setIsCompleting(true);
      await dispatch(completeStep({ goalId, stepId: step.id })).unwrap();
      hapticFeedback('success');
      logTaskCompletion(goalId, step.id, timeSpent);

      // Show success animation
      setIsCompleting(false);
      navigation.navigate('Success', { goalId });
    } catch (error) {
      Alert.alert('Oops!', 'Something went wrong. Please try again.');
      setIsCompleting(false);
    }
  }, [step, goalId, timeSpent, navigation, dispatch]);

  const handleSkip = useCallback(async (reason: string) => {
    if (!step) return;
    
    try {
      await dispatch(skipStep({ goalId, stepId: step.id, reason })).unwrap();
      logTaskSkip(goalId, step.id, reason);
      navigation.goBack();
    } catch (error) {
      Alert.alert('Oops!', 'Something went wrong. Please try again.');  
    }
  }, [step, goalId, navigation, dispatch]);

  const handleSwap = useCallback(async () => {
    if (!step) return;
    
    try {
      setIsSwapping(true);
      const newStep: MicroStep = await dispatch(swapStep({ goalId, stepId: step.id })).unwrap();
      logTaskSwap(goalId, step.id, newStep.id);
      setIsSwapping(false);
      // TODO: update step in UI
    } catch (error) {
      Alert.alert('Oops!', 'No alternative available. Please try again later.');
      setIsSwapping(false);  
    }
  }, [step, goalId, dispatch]);

  if (!step) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );  
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.stepNumber}>
          Step {step.number} of {goal?.targetDays}  
        </Text>
        <ProgressBar
          progress={progress} 
          width={200}
          color={colors.primary}
          style={styles.progressBar}
        />
      </View>

      <View style={styles.contentContainer}>  
        <Text style={styles.taskTitle}>{step.title}</Text>
        <Markdown>{step.description}</Markdown>
        
        <TouchableOpacity 
          style={styles.tipsButton}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.tipsButtonText}>
            {showTips ? 'Hide' : 'Show'} Tips
          </Text>
          <Icon
            name={showTips ? 'chevron-up' : 'chevron-down'}
            type="feather"
            color={colors.text.secondary}
            size={20}
          />
        </TouchableOpacity>
        
        {showTips && (
          <View style={styles.tipsContainer}>
            {step.tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Icon 
                  name="check"
                  type="feather"
                  color={colors.success}
                  size={18}
                  style={styles.tipIcon}
                />
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.actionContainer}>
        <Button
          title={isCompleting ? 'Completing...' : 'Complete'}
          buttonStyle={[styles.button, styles.completeButton]}
          onPress={handleComplete}
          loading={isCompleting}
          disabled={isCompleting}
        />

        <Button
          title="Skip"
          type="outline"
          buttonStyle={[styles.button, styles.skipButton]}
          onPress={() => 
            Alert.prompt(
              'Skip Task', 
              'Are you sure you want to skip this task?',
              [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Skip', 
                  onPress: (reason) => handleSkip(reason || 'No reason given'), 
                },
              ],
              'plain-text',
              'Too difficult',  
            )
          }
        />
        
        <Button
          title={isSwapping ? 'Swapping...' : 'Swap Task'}
          type="clear"
          buttonStyle={[styles.button, styles.swapButton]}
          titleStyle={styles.swapButtonText}
          onPress={handleSwap}
          loading={isSwapping}
          disabled={isSwapping}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: spacing.lg,
  },
  progressContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  stepNumber: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  progressBar: {
    marginBottom: spacing.lg,
  },
  contentContainer: {
    flex: 1,
  },
  taskTitle: {
    ...typography.h2,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  tipsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  tipsButtonText: {
    ...typography.body,
    color: colors.text.secondary,
    marginRight: spacing.sm,
  },  
  tipsContainer: {
    backgroundColor: colors.background.tertiary,
    borderRadius: 10,
    padding: spacing.md,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  tipIcon: {
    marginRight: spacing.sm,
  },
  tipText: {
    ...typography.body,
    flex: 1,
  },
  actionContainer: {
    marginTop: spacing.lg,
  },
  button: {
    marginBottom: spacing.md,
    borderRadius: spacing.sm,
  },
  completeButton: {
    backgroundColor: colors.success,
  },
  skipButton: {
    borderColor: colors.text.secondary,
  },
  swapButton: {
    alignSelf: 'center',
    paddingHorizontal: spacing.lg,
  },
  swapButtonText: {
    ...typography.button,
    color: colors.primary,
  },
});