import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { goalService } from '@/services/api/goalService';
import { GoalType, MicroStepType } from '@/types';

// Async thunks
export const fetchActiveGoal = createAsyncThunk(
  'goals/fetchActive',
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getActiveGoal();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTodaysStep = createAsyncThunk(
  'goals/fetchTodaysStep', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getTodaysStep();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  activeGoal: null as GoalType | null,
  todaysStep: null as MicroStepType | null,
  loading: false,
  error: null as string | null,
};

// Slice
const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActiveGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.activeGoal = action.payload;
      })
      .addCase(fetchActiveGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchTodaysStep.pending, (state) => {
        state.loading = true;
        state.error = null;
      })  
      .addCase(fetchTodaysStep.fulfilled, (state, action) => {
        state.loading = false;
        state.todaysStep = action.payload;
      })
      .addCase(fetchTodaysStep.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default goalSlice.reducer;