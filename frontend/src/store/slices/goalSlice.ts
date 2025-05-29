import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as goalService from '../../services/api/goalService';
import { Goal, GoalSummary, MicroStep } from '../../types/GoalTypes';

// ... existing state and reducers ...

export const fetchGoalSummary = createAsyncThunk(
  'goal/fetchGoalSummary',
  async (_, { rejectWithValue }) => {
    try {
      const goalSummary = await goalService.fetchGoalSummary();
      return goalSummary;
    } catch (err) {
      console.error('Error fetching goal summary:', err);
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchTodaysTask = createAsyncThunk(
  'goal/fetchTodaysTask',
  async (_, { rejectWithValue }) => {
    try {
      const todaysTask = await goalService.fetchTodaysTask();
      return todaysTask;
    } catch (err) {
      console.error('Error fetching today\'s task:', err);
      return rejectWithValue(err.response.data);
    }
  }  
);

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    // ... existing reducers ...
  },
  extraReducers: (builder) => {
    builder
      // ... existing extra reducers ...
      .addCase(fetchGoalSummary.fulfilled, (state, action) => {
        state.activeGoal = action.payload.activeGoal;
        state.goalProgress = action.payload.progress;
        state.currentStreak = action.payload.streak;
      })
      .addCase(fetchTodaysTask.fulfilled, (state, action) => {
        state.todaysTask = action.payload;
      });
  },
});

export default goalSlice.reducer;