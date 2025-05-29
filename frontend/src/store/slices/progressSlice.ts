import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { 
  fetchDashboardSummary,
  fetchCurrentStreak, 
  fetchProgressTimeline,
  fetchCompletionStats,
  fetchAchievements
} from '../../services/api/progressService';
import { DashboardSummary, Streak, TimelineData, CompletionStats, Achievement } from '../../types/ProgressTypes';

interface ProgressState {
  summary: DashboardSummary | null;
  streak: Streak | null;
  timeline: TimelineData[];
  stats: CompletionStats | null;
  achievements: Achievement[];
}

const initialState: ProgressState = {
  summary: null,
  streak: null,
  timeline: [],
  stats: null,
  achievements: []
};

export const getDashboardSummary = createAsyncThunk(
  'progress/getDashboardSummary',
  async () => {
    const response = await fetchDashboardSummary();
    return response;
  }
);

export const getCurrentStreak = createAsyncThunk(
  'progress/getCurrentStreak',
  async () => {
    const response = await fetchCurrentStreak();
    return response;
  }
);

export const getProgressTimeline = createAsyncThunk(
  'progress/getProgressTimeline',
  async () => {
    const response = await fetchProgressTimeline();
    return response;
  }  
);

export const getCompletionStats = createAsyncThunk(
  'progress/getCompletionStats',
  async () => {
    const response = await fetchCompletionStats();
    return response;
  }
);

export const getAchievements = createAsyncThunk(
  'progress/getAchievements',
  async () => {
    const response = await fetchAchievements();
    return response;
  }
);

export const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardSummary.fulfilled, (state, action) => {
        state.summary = action.payload;
      })
      .addCase(getCurrentStreak.fulfilled, (state, action) => {
        state.streak = action.payload;
      })
      .addCase(getProgressTimeline.fulfilled, (state, action) => {
        state.timeline = action.payload;
      })
      .addCase(getCompletionStats.fulfilled, (state, action) => {
        state.stats = action.payload;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.achievements = action.payload;
      });
  }
});

export const selectProgressSummary = (state: RootState) => state.progress.summary;
export const selectCurrentStreak = (state: RootState) => state.progress.streak;
export const selectProgressTimeline = (state: RootState) => state.progress.timeline;
export const selectCompletionStats = (state: RootState) => state.progress.stats; 
export const selectAchievements = (state: RootState) => state.progress.achievements;

export default progressSlice.reducer;