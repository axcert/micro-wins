// ... existing imports
import { 
  fetchDashboardSummary,
  fetchStreakData,
  fetchProgressTimeline,
  fetchProgressStats,
  fetchAchievements,
} from '../api/progressApi';

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    dashboardSummary: null,
    streakData: null,
    progressTimeline: null, 
    progressStats: null,
    achievements: null,
    loading: false,
    error: null,
  },
  reducers: {
    // ... existing reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardSummary = action.payload;
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // ... similar extra reducers for other fetch actions
  },
});

export const { /* ... existing actions */ } = progressSlice.actions;

export default progressSlice.reducer;