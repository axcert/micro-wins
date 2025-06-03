```tsx
// useMissionCompletion.ts
import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { completeStep, skipStep, swapStep } from '@/store/slices/goalSlice';
import { logTimeOnScreen } from '@/services/analytics';

export function useMissionCompletion(stepId: string) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteStep = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await dispatch(completeStep(stepId)).unwrap();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setIsCompleted(true);

      logTimeOnScreen('task_completion', {
        step_id: stepId,
        action: 'complete',
      });

    } catch (error) {
      console.error('Error completing step:', error);
    }

    setIsLoading(false);
  }, [dispatch, stepId]);

  const handleSkipStep = useCallback(async () => {
    setIsLoading(true);

    try {
      await dispatch(skipStep(stepId)).unwrap();
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      logTimeOnScreen('task_completion', {
        step_id: stepId,
        action: 'skip',
      });

    } catch (error) {
      console.error('Error skipping step:', error);
    }
    
    setIsLoading(false);
  }, [dispatch, stepId]);

  const handleSwapStep = useCallback(async () => {
    setIsLoading(true);

    try {
      await dispatch(swapStep(stepId)).unwrap();
      Haptics.selectionAsync();

      logTimeOnScreen('task_completion', {
        step_id: stepId,
        action: 'swap',
      });

    } catch (error) {
      console.error('Error swapping step:', error);  
    }
    
    setIsLoading(false);
  }, [dispatch, stepId]);

  return {
    isLoading,
    isCompleted,
    completeStep: handleCompleteStep,
    skipStep: handleSkipStep, 
    swapStep: handleSwapStep,
  };
}
```