import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal, fetchGoalStatus, fetchGoalSteps } from '../redux/goalSlice';
import { showNotification } from '../utils/notificationUtils';

const GoalCreationScreen = () => {
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [timeline, setTimeline] = useState(30);

  const dispatch = useDispatch();
  const { currentGoal, status, error } = useSelector((state) => state.goal);

  const handleSubmit = async () => {
    const goalData = {
      title: goal,
      category,
      difficulty,
      target_days: timeline,
    };

    await dispatch(createGoal(goalData));
  };

  React.useEffect(() => {
    if (currentGoal) {
      const pollGoalStatus = setInterval(async () => {
        await dispatch(fetchGoalStatus(currentGoal.id));
        
        if (currentGoal.status === 'completed') {
          clearInterval(pollGoalStatus);
          await dispatch(fetchGoalSteps(currentGoal.id));
          showNotification('Goal processing completed!');
        }
      }, 5000);

      return () => clearInterval(pollGoalStatus);
    }
  }, [currentGoal, dispatch]);

  if (status === 'loading') {
    return <div>Processing goal...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  if (currentGoal?.steps) {
    return (
      <div>
        <h2>Generated Steps:</h2>
        <ul>
          {currentGoal.steps.map((step) => (
            <li key={step.id}>{step.title}</li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h1>Create Goal</h1>
      <input 
        type="text"
        placeholder="Enter your goal"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      {/* Add other form fields */}
      <button onClick={handleSubmit}>Submit Goal</button>
    </div>
  );
};

export default GoalCreationScreen;