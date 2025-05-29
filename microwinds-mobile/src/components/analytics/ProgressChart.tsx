import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { ChartData } from '@/types/analytics';
import { colors, spacing, typography } from '@/constants/theme';

interface ProgressChartProps {
  data: ChartData;
  title: string;
  height?: number;
  showLegend?: boolean;
}

const screenWidth = Dimensions.get('window').width;

export default function ProgressChart({
  data,
  title,
  height = 220,
  showLegend = false,
}: ProgressChartProps) {
  const chartConfig = useMemo(
    () => ({
      backgroundColor: colors.background.primary,
      backgroundGradientFrom: colors.background.primary,
      backgroundGradientTo: colors.background.primary,
      decimalPlaces: 0,
      color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
      style: {
        borderRadius: spacing.md,
      },
      propsForDots: {
        r: '6',
        strokeWidth: '2',
        stroke: colors.primary,
      },
    }),
    []
  );

  const chartData = useMemo(
    () => ({
      labels: data.labels,
      datasets: data.datasets.map(dataset => ({
        data: dataset.data,
        color: dataset.color,
        strokeWidth: dataset.strokeWidth || 2,
      })),
      legend: showLegend ? ['Completion Rate'] : [],
    }),
    [data, showLegend]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={chartData}
          width={screenWidth - spacing.lg * 2}
          height={height}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
          withInnerLines={false}
          withOuterLines={true}
          withVerticalLabels={true}
          withHorizontalLabels={true}
          withVerticalLines={false}
          withHorizontalLines={true}
          fromZero
          segments={5}
          yAxisSuffix="%"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  title: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  chartContainer: {
    alignItems: 'center',
    backgroundColor: colors.background.card,
    borderRadius: spacing.md,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.lg,
    elevation: 2,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  chart: {
    marginVertical: spacing.sm,
    borderRadius: spacing.md,
  },
});