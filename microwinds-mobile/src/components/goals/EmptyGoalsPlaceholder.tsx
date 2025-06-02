import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';

interface EmptyGoalsPlaceholderProps {
  onCreateGoal: () => void;
}

export default function EmptyGoalsPlaceholder({ onCreateGoal }: EmptyGoalsPlaceholderProps) {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/empty-goals.png')} style={styles.image} />
      
      <Text style={styles.title}>No Active Goals</Text>
      <Text style={styles.subtitle}>Let's create your first goal!</Text>
      
      <TouchableOpacity style={styles.button} onPress={onCreateGoal}>
        <Text style={styles.buttonText}>+ Add Goal</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: spacing.xl,
  },
  title: {
    ...typography.h2,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.sm,
  },
  buttonText: {
    ...typography.button,
    color: colors.background.primary,
  },
});