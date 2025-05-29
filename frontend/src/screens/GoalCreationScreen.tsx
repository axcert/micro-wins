import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createGoal, GoalInput } from '../services/api/goalService';
import {
  goalCreationStarted,
  goalCreationSucceeded,
  goalCreationFailed,
} from '../store/slices/goalSlice';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorMessage from '../components/common/ErrorMessage';
import { RootState } from '../store';

const GoalCreationScreen: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.goal.isLoading);
  const error = useSelector((state: RootState) => state.goal.error);
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [targetDays, setTargetDays] = useState(0);

  const handleSubmit = async () => {
    dispatch(goalCreationStarted());

    const goalInput: GoalInput = {
      title,
      category,
      targetDays,
    };

    try {
      const createdGoal = await createGoal(goalInput);
      dispatch(goalCreationSucceeded(createdGoal));
      // Navigate to goal processing screen
    } catch (error) {
      dispatch(goalCreationFailed(error.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Goal</Text>
      
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message={error} />}
      
      <TextInput
        style={styles.input}
        placeholder="Goal Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Target Days"
        keyboardType="number-pad"
        value={targetDays.toString()}
        onChangeText={(text) => setTargetDays(parseInt(text))}
      />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default GoalCreationScreen;