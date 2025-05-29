import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { createGoal } from '../redux/goalSlice';
import tw from 'tailwind-react-native-classnames';

const categories = ['Social', 'Health', 'Career', 'Learning'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const GoalCreationScreen = () => {
  const dispatch = useDispatch();
  const [goalText, setGoalText] = useState('');
  const [category, setCategory] = useState(null);
  const [difficulty, setDifficulty] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (goalText.length < 10) {
      alert('Goal must be at least 10 characters');
      return;
    }
    
    setLoading(true);
    try {
      const goal = {
        text: goalText,
        category,
        difficulty,
      };
      await dispatch(createGoal(goal));
      // Navigate to preview screen
    } catch (error) {
      console.log('Error creating goal:', error);
      alert('Failed to create goal. Please try again.');
    }
    setLoading(false);
  };

  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Create a New Goal</Text>
      
      <TextInput
        style={tw`border border-gray-300 rounded p-2 mb-4`}
        placeholder="Describe your goal..."
        value={goalText}
        onChangeText={setGoalText}
        multiline
      />
      
      <Text style={tw`text-lg font-bold mb-2`}>Category</Text>
      <View style={tw`flex-row justify-between mb-4`}>
        {categories.map((cat) => (
          <TouchableOpacity 
            key={cat}
            style={tw`px-4 py-2 rounded ${category === cat ? 'bg-blue-500' : 'bg-gray-200'}`}
            onPress={() => setCategory(cat)}
          >
            <Text style={tw`${category === cat ? 'text-white' : 'text-gray-800'}`}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={tw`text-lg font-bold mb-2`}>Difficulty</Text>
      <View style={tw`flex-row justify-between mb-4`}>
        {difficulties.map((diff) => (
          <TouchableOpacity
            key={diff}
            style={tw`px-4 py-2 rounded ${difficulty === diff ? 'bg-blue-500' : 'bg-gray-200'}`}
            onPress={() => setDifficulty(diff)}
          >
            <Text style={tw`${difficulty === diff ? 'text-white' : 'text-gray-800'}`}>{diff}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={tw`bg-blue-500 rounded p-4`}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={tw`text-white text-center text-lg`}>Create Goal</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default GoalCreationScreen;