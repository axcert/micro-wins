import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardSummary, fetchStreakData, fetchProgressChartData, fetchCompletionRate, exportProgressData, shareProgressImage } from '../api/progressApi';

export const fetchProgressData = createAsyncThunk(
  'progress/fetchProgressData',
  async (userId, { rejectWithValue }) => {
    try {
      const [summary, streakData, chartData, completionRate] = await Promise.all([
        fetchDashboardSummary(userId),
        fetchStreakData(userId),
        fetchProgressChartData(userId),
        fetchCompletionRate(userId),
      ]);
      return { summary, streakData, chartData, completionRate };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const exportProgress = createAsyncThunk(
  'progress/exportProgress',
  async (userId, { rejectWithValue }) => {
    try {
      const exportUrl = await exportProgressData(userId);
      return exportUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const shareProgress = createAsyncThunk(
  'progress/shareProgress', 
  async (userId, { rejectWithValue }) => {
    try {
      const imageUrl = await shareProgressImage(userId);
      return imageUrl;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    data: [],
    streakData: {},
    chartData: [],
    completionRate: 0,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProgressData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.summary;
        state.streakData = action.payload.streakData;
        state.chartData = action.payload.chartData;
        state.completionRate = action.payload.completionRate;
      })
      .addCase(fetchProgressData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default progressSlice.reducer;