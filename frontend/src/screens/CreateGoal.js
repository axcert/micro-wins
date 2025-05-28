import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { createGoal } from '../store/goalSlice';
import { useNavigation } from '@react-navigation/native';

const CreateGoal = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await dispatch(createGoal({ title, category, difficulty })).unwrap();
      navigation.navigate('PreviewSteps');
    } catch (err) {
      console.error('Error creating goal:', err);
      // TODO: show error message to user
    } finally {
      setIsLoading(false);  
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Goal</Text>
      
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter your goal"
      />
      
      <TextInput 
        style={styles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Category (optional)"
      />
      
      <TextInput
        style={styles.input}  
        value={difficulty}
        onChangeText={setDifficulty}
        placeholder="Difficulty (easy/medium/hard)"
      />

      <Button 
        title="Generate Steps"
        onPress={handleSubmit}
        disabled={isLoading}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
});

export default CreateGoal;