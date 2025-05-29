import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchGoalStatus, fetchGoalMicroSteps } from '../services/api/goalService';
import { setCurrentGoalStatus, setCurrentGoalMicroSteps, clearGoalState } from '../store/slices/goalSlice';

const GoalProcessingScreen = () => {
  const dispatch = useDispatch();
  const { currentGoalId, currentGoalStatus } = useSelector((state: RootState) => state.goal);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const pollGoalStatus = async () => {
      if (!currentGoalId) return;

      try {
        const status = await fetchGoalStatus(currentGoalId);
        dispatch(setCurrentGoalStatus(status));

        if (status === 'completed') {
          const microSteps = await fetchGoalMicroSteps(currentGoalId);
          dispatch(setCurrentGoalMicroSteps(microSteps));
          clearInterval(intervalId);
          // Navigate to goal review screen
        }
      } catch (err) {
        console.error(`Error polling status for goal ${currentGoalId}:`, err);
        // Show error message to user
      }
    };

    intervalId = setInterval(pollGoalStatus, 5000);

    return () => {
      clearInterval(intervalId);
      dispatch(clearGoalState());
    };
  }, [currentGoalId, dispatch]);

  return (
    <View>
      <Text>Goal is being processed...</Text>
      {currentGoalStatus === 'completed' ? (
        <Text>Goal processing completed!</Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default GoalProcessingScreen;