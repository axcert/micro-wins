import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '@/constants/theme';

type Category = 'health' | 'career' | 'social' | 'learning';

const categoryOptions: { label: string; value: Category; icon: string }[] = [
  { label: 'Health', value: 'health', icon: 'fitness' },
  { label: 'Career', value: 'career', icon: 'briefcase' },
  { label: 'Social', value: 'social', icon: 'people' },
  { label: 'Learning', value: 'learning', icon: 'school' },
];

interface CategoryPickerProps {
  selectedCategory: Category | '';
  onSelectCategory: (category: Category) => void;
}

export default function CategoryPicker({
  selectedCategory,
  onSelectCategory,
}: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goal Category:</Text>
      <View style={styles.optionsContainer}>
        {categoryOptions.map(option => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.option,
              selectedCategory === option.value && styles.selectedOption,
            ]}
            onPress={() => onSelectCategory(option.value)}
          >
            <Icon
              name={option.icon}
              size={24}
              color={
                selectedCategory === option.value
                  ? colors.primary
                  : colors.text.secondary
              }
              style={styles.icon}
            />
            <Text
              style={[
                styles.optionText,
                selectedCategory === option.value && styles.selectedText,
              ]}
            >
              {option.label}
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
    ...typography.bodySmall,
    color: colors.text.muted,
    marginBottom: spacing.xs,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  selectedOption: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  icon: {
    marginRight: spacing.sm,
  },
  optionText: {
    ...typography.body,
    color: colors.text.secondary,
  },
  selectedText: {
    color: colors.primary,
  },
});