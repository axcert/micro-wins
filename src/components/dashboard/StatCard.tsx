import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '@/constants/theme';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  iconColor?: string;
}

export default function StatCard({ icon, label, value, iconColor }: StatCardProps) {
  return (
    <View style={styles.container}>
      <Icon name={icon} color={iconColor || colors.text.secondary} size={32} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    borderRadius: spacing.md,
    padding: spacing.md,
    width: 100,
  },
  value: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.sm,
  },
  label: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
});