import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const StreakStats = () => {
  const { currentStreak, bestStreak } = useSelector(state => state.progress.streakData);

  return (
    <View style={styles.container}>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Current Streak</Text>
        <Text style={styles.statValue}>{currentStreak} days</Text>
      </View>
      <View style={styles.statContainer}>
        <Text style={styles.statLabel}>Best Streak</Text>
        <Text style={styles.statValue}>{bestStreak} days</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statContainer: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#888',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default StreakStats;