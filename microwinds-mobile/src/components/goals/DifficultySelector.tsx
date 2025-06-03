```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';

interface DifficultySelectorProps {
  selectedDifficulty: 'easy' | 'medium' | 'hard';
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const difficulties = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function DifficultySelector({
  selectedDifficulty,
  onDifficultyChange,
}: DifficultySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Difficulty Preference</Text>
      <View style={styles.row}>
        {difficulties.map((difficulty) => (
          <TouchableOpacity
            key={difficulty.value}
            style={[
              styles.option,
              selectedDifficulty === difficulty.value && styles.selectedOption,
            ]}
            onPress={() => onDifficultyChange(difficulty.value)}
          >
            <Text style={[
              styles.optionText,
              selectedDifficulty === difficulty.value && styles.selectedOptionText
            ]}>
              {difficulty.label}  
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.body,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  option: {
    backgroundColor: colors.background.tertiary,
    padding: spacing.md,
    borderRadius: spacing.sm,
    alignItems: 'center',
    width: '31%',
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    ...typography.button,
    color: colors.text.primary,
  },
  selectedOptionText: {
    color: colors.background.primary,
  },
});
```