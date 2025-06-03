```tsx
// TodaysMissionCard.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList } from '@/types/navigation';
import { colors, spacing, typography } from '@/constants/theme';
import { useMissionCompletion } from '@/hooks/useMissionCompletion';
import { useAppSelector } from '@/store';

type TodaysMissionCardNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Task'
>;

export default function TodaysMissionCard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigation = useNavigation<TodaysMissionCardNavigationProp>();

  const { todaysStep, goalProgress, streakCount } = useAppSelector(
    (state) => ({
      todaysStep: state.goals.todaysStep!,
      goalProgress: state.goals.activeGoal?.progress || 0,
      streakCount: state.progress.streakCount || 0,
    })
  );

  const { 
    isLoading, 
    isCompleted,
    completeStep,
    skipStep,
    swapStep
  } = useMissionCompletion(todaysStep.id);

  const handleComplete = () => {
    completeStep();
  };

  const handleSkip = () => {
    Alert.alert(
      'Skip Task',
      'Are you sure you want to skip today\'s task?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Skip', onPress: skipStep },
      ]
    );
  };

  const handleSwap = () => {
    swapStep();
  };

  if (isCompleted) {
    // Show success animation and navigate to home
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2000);

    return (
      <View style={styles.completionContainer}>
        <LottieView
          source={require('@/assets/animations/confetti.json')}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <Text style={styles.completionText}>
          Amazing work! See you tomorrow.
        </Text>
      </View>  
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.stepCounter}>
        Step {todaysStep.stepNumber} of {todaysStep.goalSteps}
      </Text>
      
      <Text style={styles.taskTitle}>{todaysStep.title}</Text>
      
      <TouchableOpacity
        style={styles.descriptionContainer}
        activeOpacity={0.7}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.text.secondary}
        />
        <Text 
          style={[
            styles.description,
            isExpanded && styles.expandedDescription  
          ]}
          numberOfLines={isExpanded ? undefined : 3}
        >
          {todaysStep.description}
        </Text>
      </TouchableOpacity>

      <View style={styles.tipContainer}>
        <Text style={styles.tipTitle}>
          <Icon name="bulb" size={18} color={colors.primary} /> 
          {' '}Pro Tip
        </Text>
        <Text style={styles.tipText}>
          {todaysStep.tips[0]}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          Goal Progress: {Math.round(goalProgress)}%
        </Text>
        <Text style={styles.streakText}>
          🔥 {streakCount} Day Streak
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.completeButton, isLoading && styles.loadingButton]}
          onPress={handleComplete}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Completing...' : 'Complete'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={handleSkip}
        >
          <Text style={styles.secondaryButtonText}>Skip</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.swapButton} 
          onPress={handleSwap}
        >
          <Text style={styles.secondaryButtonText}>Swap Task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: spacing.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  stepCounter: {
    ...typography.caption,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  taskTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  expandedDescription: {
    height: 'auto',
  },
  tipContainer: {
    backgroundColor: colors.primary + '10',
    borderRadius: spacing.sm,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  tipTitle: {
    ...typography.bodySmall,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  tipText: {
    ...typography.body,
    color: colors.text.primary,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  progressText: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },
  streakText: {
    ...typography.body,
    color: colors.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  completeButton: {
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginHorizontal: spacing.sm,
  },
  loadingButton: {
    opacity: 0.7,
  },
  buttonText: {
    ...typography.button,
    color: colors.text.inverse,
  },
  skipButton: {
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.xs,
  },
  swapButton: {
    borderRadius: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.xs,
  },
  secondaryButtonText: {
    ...typography.button,
    color: colors.primary,
  },
  completionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  animation: {
    width: 200,
    height: 200,
  },
  completionText: {
    ...typography.h3,
    textAlign: 'center',
    color: colors.success,
    marginTop: spacing.lg,
  },
});
```