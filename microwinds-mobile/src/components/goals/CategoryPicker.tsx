```tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '@/constants/theme';

interface CategoryPickerProps {
  selectedCategory: 'social' | 'health' | 'career' | 'learning';
  onCategoryChange: (category: 'social' | 'health' | 'career' | 'learning') => void;
}

export default function CategoryPicker({
  selectedCategory,
  onCategoryChange,
}: CategoryPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Goal Category</Text>
      <View style={styles.row}>
        <CategoryOption
          icon="people"
          label="Social"
          isSelected={selectedCategory === 'social'}
          onPress={() => onCategoryChange('social')}
        />
        <CategoryOption
          icon="fitness"
          label="Health"
          isSelected={selectedCategory === 'health'}
          onPress={() => onCategoryChange('health')}
        />
        <CategoryOption
          icon="briefcase"
          label="Career"
          isSelected={selectedCategory === 'career'}
          onPress={() => onCategoryChange('career')}
        />
        <CategoryOption
          icon="school"
          label="Learning"
          isSelected={selectedCategory === 'learning'}
          onPress={() => onCategoryChange('learning')}
        />
      </View>
    </View>
  );
}

interface CategoryOptionProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

function CategoryOption({ icon, label, isSelected, onPress }: CategoryOptionProps) {
  return (
    <TouchableOpacity
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={onPress}
    >
      <Icon 
        name={icon} 
        size={32} 
        color={isSelected ? colors.background.primary : colors.text.primary}
      />
      <Text style={[styles.optionText, isSelected && styles.selectedOptionText]}>
        {label}
      </Text>
    </TouchableOpacity>
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
    width: '23%',
  },
  selectedOption: {
    backgroundColor: colors.primary,
  },
  optionText: {
    ...typography.caption,
    color: colors.text.primary,
    marginTop: spacing.xs,
  },
  selectedOptionText: {
    color: colors.background.primary,
  },
});
```