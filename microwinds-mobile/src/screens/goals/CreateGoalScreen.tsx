```tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { createGoal } from '@/services/api/goalService';
import { setActiveGoal } from '@/store/slices/goalSlice';
import { colors, spacing, typography } from '@/constants/theme';
import CategoryPicker from '@/components/goals/CategoryPicker';
import DifficultySelector from '@/components/goals/DifficultySelector';

type GoalCategory = 'social' | 'health' | 'career' | 'learning';

interface CreateGoalFormData {
  title: string;
  category: GoalCategory;
  difficultyPreference: 'easy' | 'medium' | 'hard';
}

export default function CreateGoalScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<CreateGoalFormData>({
    title: '',
    category: 'social',
    difficultyPreference: 'medium',
  });

  const createGoalMutation = useMutation(createGoal, {
    onSuccess: (data) => {
      dispatch(setActiveGoal(data));
      queryClient.invalidateQueries('userGoals');
      navigation.navigate('GoalPreview', { goalId: data.id });
    },
  });

  const handleTitleChange = (text: string) => {
    setFormData((prev) => ({ ...prev, title: text }));
  };

  const handleCategoryChange = (category: GoalCategory) => {
    setFormData((prev) => ({ ...prev, category }));
  };

  const handleDifficultyChange = (difficulty: 'easy' | 'medium' | 'hard') => {
    setFormData((prev) => ({ ...prev, difficultyPreference: difficulty }));
  };

  const handleSubmit = () => {
    createGoalMutation.mutate(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Goal</Text>

      <TextInput
        style={styles.input}
        placeholder="Describe your goal (min 10 characters)"
        onChangeText={handleTitleChange}
        value={formData.title}
        multiline
      />

      <CategoryPicker 
        selectedCategory={formData.category}
        onCategoryChange={handleCategoryChange}
      />

      <DifficultySelector
        selectedDifficulty={formData.difficultyPreference} 
        onDifficultyChange={handleDifficultyChange}
      />

      <TouchableOpacity 
        style={[
          styles.button,
          formData.title.length < 10 && styles.disabledButton
        ]}
        onPress={handleSubmit}
        disabled={formData.title.length < 10 || createGoalMutation.isLoading}
      >
        {createGoalMutation.isLoading ? (
          <ActivityIndicator color={colors.background.primary} />
        ) : (
          <Text style={styles.buttonText}>Generate Micro-Steps</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background.secondary,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background.primary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
  },
  buttonText: {
    ...typography.button,
    color: colors.background.primary,
  },
});
```