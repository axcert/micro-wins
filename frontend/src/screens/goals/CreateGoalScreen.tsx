import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import { createGoal } from '../../store/slices/goalSlice';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '../../constants/theme';

const CreateGoalScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateGoal = async () => {
    try {
      setIsLoading(true);
      await dispatch(createGoal({ title, category, difficulty }));
      navigation.navigate('GoalPreviewScreen');
    } catch (err) {
      console.error('Error creating goal:', err);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={{ padding: spacing.md }}>
      <Text style={typography.h2}>Create a new goal</Text>

      <TextInput
        style={{ marginTop: spacing.lg }}
        placeholder="Describe your goal"
        value={title}
        onChangeText={setTitle}
      />

      <View style={{ marginTop: spacing.lg }}>
        <Text style={typography.h3}>Category</Text>
        {/* TODO: Implement category selection */}
      </View>

      <View style={{ marginTop: spacing.lg }}>
        <Text style={typography.h3}>Difficulty</Text>
        {/* TODO: Implement difficulty selection */}
      </View>

      <TouchableOpacity 
        style={{
          backgroundColor: colors.primary,
          paddingVertical: spacing.md,
          alignItems: 'center',
          marginTop: spacing.xl
        }}
        onPress={handleCreateGoal}
        disabled={isLoading || title.length < 10}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />  
        ) : (
          <Text style={{ color: '#fff' }}>Generate Steps</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CreateGoalScreen;