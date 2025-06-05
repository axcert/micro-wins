import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '@/constants/theme';

interface MissionCardProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  onPress: () => void;
}

export default function MissionCard({ stepNumber, totalSteps, title, description, onPress }: MissionCardProps) {
  return (
    <Card containerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stepLabel}>Step {stepNumber} of {totalSteps}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>Start Mission</Text>
        <Icon name="rocket" color={colors.background.primary} size={24} />
      </TouchableOpacity>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.md,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepLabel: {
    ...typography.caption,
    color: colors.text.secondary,
  },  
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  description: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  buttonText: {
    ...typography.button,
    color: colors.background.primary,
    marginRight: spacing.sm,
  },
});