// ... existing imports
import { createGoal, requestGoalDecomposition } from '../redux/goalSlice';

const GoalInputScreen = () => {
  // ... component logic

  const handleGoalSubmit = async () => {
    try {
      const goal = {
        title,
        category,
        difficultyPreference,
        timelinePreference,
      };
      
      const createdGoal = await dispatch(createGoal(goal)).unwrap();
      console.log('Goal created:', createdGoal);

      await dispatch(requestGoalDecomposition(createdGoal.id)).unwrap();
      console.log('Goal decomposition requested');

      // Navigate to goal review screen
      navigation.navigate('GoalReview', { goalId: createdGoal.id });
    } catch (error) {
      console.error('Error creating goal:', error);
      // Handle error state
    }
  };

  // ... render UI
};

export default GoalInputScreen;