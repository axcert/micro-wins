import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { progressService } from '@/services/api/progressService';

interface ProgressState {
  completionData: {
    completedPercentage: number;
    progressOverTime: { date: string; count: number }[];
  };
  streakData: {
    currentStreak: number;
    bestStreak: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  completionData: {
    completedPercentage: 0,
    progressOverTime: [],
  },
  streakData: {
    currentStreak: 0,
    bestStreak: 0,
  },
  loading: false,
  error: null,
};

export const fetchProgressData = createAsyncThunk(
  'progress/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await progressService.getProgressData();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgressData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProgressData.fulfilled, (state, action) => {
        state.loading = false;
        state.completionData = action.payload.completionData;
        state.streakData = action.payload.streakData;
      })
      .addCase(fetchProgressData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default progressSlice.reducer;