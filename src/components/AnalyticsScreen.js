import React, { useEffect, useState } from 'react';
import { View, Text, RefreshControl, Share } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { BarChart } from 'react-native-chart-kit';
import { fetchDashboardSummary, fetchProgressChartData, exportProgressData } from '../api/analyticsApi';
import { setDashboardSummary, setProgressChartData } from '../redux/analyticsSlice';
import tw from 'tailwind-react-native-classnames';

const AnalyticsScreen = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(state => state.auth);
  const { dashboardSummary, progressChartData } = useSelector(state => state.analytics);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setRefreshing(true);
    const summaryData = await fetchDashboardSummary(userId);
    dispatch(setDashboardSummary(summaryData));

    const chartData = await fetchProgressChartData(userId, '2023-01-01', '2023-12-31');
    dispatch(setProgressChartData(chartData));
    setRefreshing(false);
  };

  const handleExport = async () => {
    const exportData = await exportProgressData(userId);
    // TODO: Implement save to device
    await Share.share({
      message: 'Check out my goal progress!',
      url: exportData.url,
    });
  };

  if (!dashboardSummary || !progressChartData) {
    return (
      <View style={tw`flex-1 items-center justify-center`}>
        <Text>Loading analytics...</Text>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 p-4`}>
      <RefreshControl 
        refreshing={refreshing}
        onRefresh={loadDashboardData}
      />
      <Text style={tw`text-2xl font-bold mb-4`}>Analytics Dashboard</Text>
      
      <View style={tw`bg-white rounded-lg p-4 mb-4`}>
        <Text style={tw`text-lg font-bold mb-2`}>Weekly Summary</Text>
        <Text>Completed Tasks: {dashboardSummary.completedTasks}</Text>
        <Text>Streak: {dashboardSummary.currentStreak} days</Text>
      </View>
      
      <BarChart
        data={{
          labels: progressChartData.labels,
          datasets: [
            {
              data: progressChartData.values,
            },
          ],
        }}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
      />

      <Text 
        style={tw`text-blue-500 mt-4`}
        onPress={handleExport}
      >
        Export Progress Data
      </Text>
    </View>
  );
};

export default AnalyticsScreen;