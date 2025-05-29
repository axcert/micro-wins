import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAnalyticsSummary } from '../../services/api/analyticsService';

interface AnalyticsState {
  loading: boolean;
  data: {
    progress: number;
    completedGoals: number;
    activeStreaks: number;
    totalTasksCompleted: number;
  };
  error: string | null;
}

const initialState: AnalyticsState = {
  loading: false,
  data: {
    progress: 0,
    completedGoals: 0,
    activeStreaks: 0, 
    totalTasksCompleted: 0,
  },
  error: null,
};

export const fetchAnalyticsData = createAsyncThunk(
  'analytics/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchAnalyticsSummary();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnalyticsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnalyticsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAnalyticsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default analyticsSlice.reducer;