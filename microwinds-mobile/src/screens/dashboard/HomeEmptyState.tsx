import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { typography, spacing, colors } from '@/constants/theme';
import Button from '@/components/common/Button';

interface HomeEmptyStateProps {
  onCreateGoal: () => void;
}

export default function HomeEmptyState({ onCreateGoal }: HomeEmptyStateProps) {
  return (
    <View style={styles.container}>
      <Image 
        source={require('@/assets/images/empty-state.png')} 
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>No Active Goals</Text>
      <Text style={styles.subtitle}>
        Let's get started by creating your first goal!
      </Text>
      <Button 
        title="Create a Goal"
        onPress={onCreateGoal}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.h2,
    marginBottom: spacing.sm,
    color: colors.text.primary,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    marginBottom: spacing.xl,
    color: colors.text.secondary,
  },
  button: {
    paddingHorizontal: spacing.lg,
  },
});