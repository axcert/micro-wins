import { createSlice } from '@reduxjs/toolkit';

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState: {
    dashboardSummary: null,
    progressChartData: null,
  },
  reducers: {
    setDashboardSummary: (state, action) => {
      state.dashboardSummary = action.payload;
    },
    setProgressChartData: (state, action) => {
      state.progressChartData = action.payload;
    },
  },
});

export const { setDashboardSummary, setProgressChartData } = analyticsSlice.actions;

export default analyticsSlice.reducer;