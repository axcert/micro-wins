import React, { useState } from 'react';
import { View, TextInput, ActivityIndicator } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const difficultyOptions = ['Easy', 'Medium', 'Hard'];
const categories = ['Social', 'Health', 'Career', 'Learning'];

export default function CreateGoal() {
  const [goal, setGoal] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [category, setCategory] = useState('Social');
  const [loading, setLoading] = useState(false);
  
  const navigation = useNavigation(); // Changed from const { navigate } = useNavigation();

  const generateSteps = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/generate-steps', {goal, difficulty, category});
      const steps = response.data;
      setLoading(false);
      navigation.navigate('PreviewSteps', {goal, steps}); // Changed from navigate to navigation.navigate
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert("Error generating steps. Please try again.");
    }
  }

  return (
    <View style={{ padding: 20, flex: 1 , justifyContent: 'center' }}>
      <Text h4>What is your goal?</Text>
      <TextInput
        multiline
        placeholder="Enter goal (min 10 characters)"
        value={goal}
        onChangeText={setGoal}
      />
      
      <Text h4>Select Category:</Text>
      {categories.map(cat => (
        <Button 
          key={cat}
          title={cat}
          type={cat === category ? 'solid' : 'outline'}
          onPress={() => setCategory(cat)}
        />
      ))}

      <Text h4>Select Difficulty:</Text>
      {difficultyOptions.map(option => (
        <Button
          key={option} 
          title={option}
          type={option === difficulty ? 'solid' : 'outline'} 
          onPress={() => setDifficulty(option)}
        />
      ))}

      <Button 
        title="Generate Steps"
        onPress={generateSteps}
        disabled={goal.length < 10 || loading}
      />
      {loading && <ActivityIndicator />}

    </View>
  );
}