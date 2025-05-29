import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as goalApi from '../api/goalApi';

export const createGoal = createAsyncThunk(
  'goal/createGoal',
  async (goal, { rejectWithValue }) => {
    try {
      const response = await goalApi.createGoal(goal);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGoalStatus = createAsyncThunk(
  'goal/fetchGoalStatus', 
  async (goalId, { rejectWithValue }) => {
    try {
      const response = await goalApi.fetchGoalStatus(goalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchGoalSteps = createAsyncThunk(
  'goal/fetchGoalSteps',
  async (goalId, { rejectWithValue }) => {
    try {
      const response = await goalApi.fetchGoalSteps(goalId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    currentGoal: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentGoal = action.payload;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchGoalStatus.fulfilled, (state, action) => {
        if (state.currentGoal) {
          state.currentGoal.status = action.payload.status;
        }
      })
      .addCase(fetchGoalSteps.fulfilled, (state, action) => {
        if (state.currentGoal) {
          state.currentGoal.steps = action.payload;
        }
      });
  },
});

export default goalSlice.reducer;