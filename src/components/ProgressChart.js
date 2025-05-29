import React from 'react';
import { View, StyleSheet } from 'react-native';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme } from 'victory-native';
import { useSelector } from 'react-redux';

const ProgressChart = ({ startDate, endDate }) => {
  const progressChartData = useSelector(state => state.progress.chartData);

  return (
    <View style={styles.container}>
      <VictoryChart width={350} theme={VictoryTheme.material}>
        <VictoryAxis 
          tickFormat={(x) => new Date(x).toLocaleDateString()}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `${x}%`} />
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={progressChartData}
          x="date"
          y="value"
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default ProgressChart;