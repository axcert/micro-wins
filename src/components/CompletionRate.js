import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const CompletionRate = () => {
  const completionRate = useSelector(state => state.progress.completionRate);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Completion Rate</Text>
      <Text style={styles.value}>{completionRate}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    color: '#888',
  },
  value: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default CompletionRate;