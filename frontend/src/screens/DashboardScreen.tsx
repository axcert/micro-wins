... (existing imports)
import { loadDashboardSummary, loadProgressChartData, selectDashboardSummary, selectProgressChartData, selectIsLoadingDashboard, selectIsLoadingChart } from '../store/slices/analyticsSlice';
import { exportProgressData } from '../services/api/analyticsService';
import ErrorBoundary from '../components/common/ErrorBoundary';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProgressChart from '../components/dashboard/ProgressChart';
import StatisticsCard from '../components/dashboard/StatisticsCard';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const dashboardSummary = useSelector(selectDashboardSummary);  
  const progressChartData = useSelector(selectProgressChartData);
  const isLoadingDashboard = useSelector(selectIsLoadingDashboard);
  const isLoadingChart = useSelector(selectIsLoadingChart);

  useEffect(() => {
    dispatch(loadDashboardSummary());
  }, [dispatch]);

  const loadChartData = () => {
    const startDate = subDays(new Date(), 30).toISOString(); 
    const endDate = new Date().toISOString();
    dispatch(loadProgressChartData(startDate, endDate));
  };
  
  useEffect(() => {
    loadChartData(); 
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(loadDashboardSummary());
    loadChartData();
  };
  
  const handleExportData = async () => {
    try {
      const csvData = await exportProgressData('csv');
      // Initiate file download
      const blob = new Blob([csvData], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', 'progress_data.csv');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Failed to export progress data', error);
      // TODO: Show user-friendly error toast
    }
  };

  if (isLoadingDashboard) {
    return <LoadingSpinner />;
  }

  return (
    <ErrorBoundary>
      <ScrollView 
        refreshControl={
          <RefreshControl refreshing={isLoadingDashboard} onRefresh={handleRefresh} />
        }
      >
        {dashboardSummary && (
          <>
            <StatisticsCard 
              title="Total Goals"
              value={dashboardSummary.totalGoals}
            />
            <StatisticsCard
              title="Active Goals" 
              value={dashboardSummary.activeGoals}
            />
            <StatisticsCard
              title="Completion Rate"
              value={`${Math.round(dashboardSummary.completionRate * 100)}%`}
            />  
            <StatisticsCard
              title="Current Streak"
              value={dashboardSummary.currentStreak}
            />
            <StatisticsCard  
              title="Longest Streak"
              value={dashboardSummary.longestStreak} 
            />
          </>
        )}

        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>Progress Chart</Text>
          {isLoadingChart ? (
            <LoadingSpinner />
          ) : (
            <ProgressChart data={progressChartData} />
          )}
        </View>
        
        <Button title="Export Data" onPress={handleExportData} />
      </ScrollView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    marginVertical: 24,
  },
  chartTitle: {
    ...typography.h2,
    marginBottom: 16,
  },
});

export default DashboardScreen;