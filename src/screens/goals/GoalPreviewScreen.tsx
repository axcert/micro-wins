import React from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from 'react-query';
import { getGoalWithSteps } from '@/services/api/goalService';
import { colors, spacing, typography } from '@/constants/theme';
import Button from '@/components/Button';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage'; 
import MicroStepListItem from '@/components/MicroStepListItem';

type RouteParams = {
  GoalPreview: {
    goalId: number;
  };
};

export default function GoalPreviewScreen() {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RouteParams, 'GoalPreview'>>();
  const goalId = route.params.goalId;

  const { data: goal, isLoading, isError, refetch } = useQuery(
    ['goal', goalId],
    () => getGoalWithSteps(goalId),
    {
      enabled: !!goalId,
    }
  );

  const handleConfirm = () => {
    // TODO: Activate goal and navigate to home screen
    navigation.navigate('Home');
  };

  const handleEdit = () => {
    // Navigate to edit screen
    navigation.navigate('GoalEdit', { goalId });
  };

  const handleRegenerate = () => {
    // Refetch goal with steps (will trigger AI regeneration)
    refetch();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !goal) {
    return (
      <ErrorMessage
        message="Failed to load goal preview. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={goal.microSteps}
        renderItem={({ item, index }) => (
          <MicroStepListItem
            step={item}
            stepNumber={index + 1}
            editable={false}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <View style={styles.goalMeta}>
              <Text style={styles.metaText}>{goal.category}</Text>
              <Text style={styles.metaText}>{goal.targetDays} Days</Text>
              <Text style={styles.metaText}>{goal.difficultyPreference}</Text>
            </View>
          </View>
        }
        ListFooterComponent={
          <View style={styles.buttonContainer}>
            <Button
              title="Confirm Goal"
              onPress={handleConfirm}
              style={styles.button}
            />
            <Button
              title="Edit Steps"
              onPress={handleEdit}
              style={[styles.button, styles.secondaryButton]}
            />
            <Button
              title="Regenerate Steps"
              onPress={handleRegenerate}
              style={[styles.button, styles.secondaryButton]}
              loading={isLoading}
            />
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: colors.background.secondary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  goalTitle: {
    ...typography.h3,
    marginBottom: spacing.sm,
  },
  goalMeta: {
    flexDirection: 'row',
  },
  metaText: {
    ...typography.bodySmall,
    color: colors.text.muted,
    marginRight: spacing.sm,
  },
  listContent: {
    paddingBottom: spacing.xl,
  },
  buttonContainer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  button: {
    marginBottom: spacing.md,
  },
  secondaryButton: {
    backgroundColor: colors.background.secondary,
  },
});