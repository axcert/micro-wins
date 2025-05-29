import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardSummary, ProgressChart, fetchDashboardSummary, fetchProgressChartData } from '../../services/api/analyticsService';
import { AppDispatch, RootState } from '..';

interface AnalyticsState {
  dashboardSummary: DashboardSummary | null;
  progressChartData: ProgressChart[];
  isLoadingDashboard: boolean;
  isLoadingChart: boolean;
}

const initialState: AnalyticsState = {
  dashboardSummary: null,
  progressChartData: [],
  isLoadingDashboard: false,
  isLoadingChart: false,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDashboardSummary(state, action: PayloadAction<DashboardSummary>) {
      state.dashboardSummary = action.payload;
    },
    setProgressChartData(state, action: PayloadAction<ProgressChart[]>) {
      state.progressChartData = action.payload;
    },
    setIsLoadingDashboard(state, action: PayloadAction<boolean>) {
      state.isLoadingDashboard = action.payload;
    },
    setIsLoadingChart(state, action: PayloadAction<boolean>) {
      state.isLoadingChart = action.payload;
    },
  },
});

export const { setDashboardSummary, setProgressChartData, setIsLoadingDashboard, setIsLoadingChart } =
  analyticsSlice.actions;

export const loadDashboardSummary = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoadingDashboard(true));
    const data = await fetchDashboardSummary(dispatch);
    if (data) {
      dispatch(setDashboardSummary(data));
    }
  } catch (error) {
    console.error('Failed to load dashboard summary', error);
  } finally {
    dispatch(setIsLoadingDashboard(false));  
  }
};

export const loadProgressChartData = (startDate: string, endDate: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setIsLoadingChart(true));
    const data = await fetchProgressChartData(startDate, endDate);
    dispatch(setProgressChartData(data));
  } catch (error) {
    console.error('Failed to load progress chart data', error);
  } finally {
    dispatch(setIsLoadingChart(false));
  }
};

export const selectDashboardSummary = (state: RootState) => state.analytics.dashboardSummary;
export const selectProgressChartData = (state: RootState) => state.analytics.progressChartData;
export const selectIsLoadingDashboard = (state: RootState) => state.analytics.isLoadingDashboard;
export const selectIsLoadingChart = (state: RootState) => state.analytics.isLoadingChart;

export default analyticsSlice.reducer;