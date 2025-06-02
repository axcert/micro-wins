import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from 'react-query';
import { createGoal } from '@/services/api/goalService';
import { colors, spacing, typography } from '@/constants/theme';
import CategoryPicker from '@/components/CategoryPicker';
import Button from '@/components/Button';

const difficultyOptions = [
  { label: 'Easy', value: 'easy' },
  { label: 'Medium', value: 'medium' },
  { label: 'Hard', value: 'hard' },
];

export default function CreateGoalScreen() {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('medium');

  const createGoalMutation = useMutation(createGoal, {
    onSuccess: (data) => {
      // Navigate to preview screen with new goal ID
      navigation.navigate('GoalPreview', { goalId: data.id });
    },
  });

  const handleSubmit = () => {
    if (title.trim().length < 10) {
      alert('Please enter a goal description of at least 10 characters.');
      return;
    }

    if (!category) {
      alert('Please select a category for your goal.');
      return;
    }

    // Create new goal
    createGoalMutation.mutate({
      title,
      category,
      difficultyPreference: difficulty,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Goal</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Describe your goal..."
        multiline
        value={title}
        onChangeText={setTitle}
      />

      <CategoryPicker 
        selectedCategory={category}
        onSelectCategory={setCategory}
      />

      <View style={styles.difficultyContainer}>
        <Text style={styles.label}>Difficulty:</Text>
        <View style={styles.difficultyOptions}>
          {difficultyOptions.map(option => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.difficultyOption,
                difficulty === option.value && styles.selectedDifficulty,
              ]}
              onPress={() => setDifficulty(option.value)}
            >
              <Text style={styles.difficultyText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Button 
        title="Generate Steps"
        onPress={handleSubmit}
        loading={createGoalMutation.isLoading}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.lg,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: spacing.sm,
    padding: spacing.md,
    minHeight: 100,
    marginBottom: spacing.lg,
  },
  difficultyContainer: {
    marginBottom: spacing.xl,
  },
  label: {
    ...typography.bodySmall,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  difficultyOptions: {
    flexDirection: 'row',
  },
  difficultyOption: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  selectedDifficulty: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  difficultyText: {
    ...typography.body,
    color: colors.text.primary,
  },
  button: {
    marginTop: 'auto',
  },
});