import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ProgressChart as RNProgressChart } from 'react-native-chart-kit';

interface ProgressChartProps {
  progress: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ progress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Goal Progress</Text>
      <RNProgressChart
        data={{
          data: [progress],
        }}
        width={Dimensions.get('window').width - 32}
        height={220}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
        }}
        hideLegend={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default ProgressChart;