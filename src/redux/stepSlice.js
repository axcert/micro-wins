import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as stepApi from '../api/stepApi';

export const fetchStepsForGoal = createAsyncThunk(
  'steps/fetchForGoal',
  async (goalId, { rejectWithValue }) => {
    try {
      const steps = await stepApi.fetchStepsForGoal(goalId);
      return steps;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTodaysStep = createAsyncThunk(
  'steps/fetchTodays',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const step = await stepApi.fetchTodaysStep(auth.user.id);
      return step;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeStep = createAsyncThunk(
  'steps/complete',
  async (stepId, { rejectWithValue }) => {
    try {
      const updatedStep = await stepApi.completeStep(stepId);
      return updatedStep;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const skipStep = createAsyncThunk(
  'steps/skip',
  async ({ stepId, reason }, { rejectWithValue }) => {
    try {
      const updatedStep = await stepApi.skipStep(stepId, reason);
      return updatedStep;
    } catch (error) {
      return rejectWithValue(error.message); 
    }
  }
);

export const swapStep = createAsyncThunk(
  'steps/swap',
  async (stepId, { rejectWithValue }) => {
    try {
      const updatedStep = await stepApi.swapStep(stepId);
      return updatedStep;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stepSlice = createSlice({
  name: 'steps',
  initialState: {
    todaysStep: null,
    stepsForGoal: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStepsForGoal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStepsForGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.stepsForGoal = action.payload;
      })
      .addCase(fetchStepsForGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.error = action.payload;
      })
      .addCase(completeStep.fulfilled, (state, action) => {
        state.todaysStep = action.payload;
      })
      .addCase(skipStep.fulfilled, (state, action) => {
        state.todaysStep = action.payload;
      })
      .addCase(swapStep.fulfilled, (state, action) => {
        state.todaysStep = action.payload;
      });
  },
});

export default stepSlice.reducer;