import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatisticsCardProps {
  title: string;
  value: number;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#6B7280',
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
});

export default StatisticsCard;