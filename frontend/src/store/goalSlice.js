import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../services/Api';

const initialState = {
  currentGoal: null,
  steps: [],
  todayStep: null,
  loading: false,
  error: null,
};

export const fetchGoalSteps = createAsyncThunk(
  'goal/fetchSteps',
  async (goalId) => {
    const steps = await Api.getGoalSteps(goalId);
    return steps;
  }
);

export const fetchTodayStep = createAsyncThunk(
  'goal/fetchTodayStep',
  async () => {
    const step = await Api.getTodayStep();
    return step;
  }  
);

export const completeStep = createAsyncThunk(
  'goal/completeStep',
  async (stepId) => {
    await Api.completeTask(stepId);
  }
);

export const skipStep = createAsyncThunk(
  'goal/skipStep',
  async ({ stepId, reason }) => {
    await Api.skipTask(stepId, reason);
  }
);

export const swapStep = createAsyncThunk(
  'goal/swapStep', 
  async ({ stepId, alternativeStep }) => {
    await Api.swapTask(stepId, alternativeStep);
  }
);

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setCurrentGoal(state, action) {
      state.currentGoal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalSteps.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoalSteps.fulfilled, (state, action) => {
        state.steps = action.payload;
        state.loading = false;
      })
      .addCase(fetchGoalSteps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTodayStep.fulfilled, (state, action) => {
        state.todayStep = action.payload;
      })
      .addCase(completeStep.fulfilled, (state, action) => {
        state.steps = state.steps.map((step) =>
          step.id === action.meta.arg ? { ...step, completed_at: new Date() } : step
        );
        state.todayStep = null;
      })
      .addCase(skipStep.fulfilled, (state, action) => {
        const { stepId, reason } = action.meta.arg;
        state.steps = state.steps.map((step) =>
          step.id === stepId ? { ...step, skipped_at: new Date(), skip_reason: reason } : step  
        );
      })
      .addCase(swapStep.fulfilled, (state, action) => {
        const { stepId, alternativeStep } = action.meta.arg;
        state.steps = state.steps.map((step) => 
          step.id === stepId ? { ...step, ...alternativeStep } : step
        );
      });
  },
});

export const { setCurrentGoal } = goalSlice.actions;

export default goalSlice.reducer;