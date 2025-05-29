import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MicroStep } from '../../types/GoalTypes';
import {
  fetchGoalSteps,
  fetchTodayStep,
  completeStep,
  skipStep,
  swapStep,
  updateStep,
  fetchStepHistory
} from '../../services/api/microStepService';

interface MicroStepState {
  goalSteps: MicroStep[];
  todayStep: MicroStep | null;
  loading: boolean;
  error: string | null;
}

const initialState: MicroStepState = {
  goalSteps: [],
  todayStep: null,
  loading: false,
  error: null
};

export const fetchGoalStepsAsync = createAsyncThunk(
  'microStep/fetchGoalSteps',
  async (goalId: string) => {
    return await fetchGoalSteps(goalId);
  }
);

export const fetchTodayStepAsync = createAsyncThunk(
  'microStep/fetchTodayStep',
  async () => {
    return await fetchTodayStep();
  }
);

export const completeStepAsync = createAsyncThunk(
  'microStep/completeStep',
  async (stepId: string) => {
    await completeStep(stepId);
    return stepId;
  }
);

export const skipStepAsync = createAsyncThunk(
  'microStep/skipStep',
  async ({ stepId, reason }: { stepId: string; reason: string }) => {
    await skipStep(stepId, reason);
    return stepId;
  }
);

export const swapStepAsync = createAsyncThunk(
  'microStep/swapStep',
  async (stepId: string) => {
    return await swapStep(stepId);
  }
);

export const updateStepAsync = createAsyncThunk(
  'microStep/updateStep',
  async ({ stepId, updatedStep }: { stepId: string; updatedStep: Partial<MicroStep> }) => {
    await updateStep(stepId, updatedStep);
    return { stepId, updatedStep };
  }
);

const microStepSlice = createSlice({
  name: 'microStep',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalStepsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGoalStepsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.goalSteps = action.payload;
      })
      .addCase(fetchGoalStepsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching goal steps';
      })
      .addCase(fetchTodayStepAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodayStepAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.todayStep = action.payload;
      })
      .addCase(fetchTodayStepAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Error fetching today\'s step';
      })
      .addCase(completeStepAsync.fulfilled, (state, action) => {
        const completedStepIndex = state.goalSteps.findIndex(
          (step) => step.id === action.payload
        );
        if (completedStepIndex !== -1) {
          state.goalSteps[completedStepIndex].completed_at = new Date().toISOString();
        }
        if (state.todayStep?.id === action.payload) {
          state.todayStep.completed_at = new Date().toISOString();
        }
      })
      .addCase(skipStepAsync.fulfilled, (state, action) => {
        const skippedStepIndex = state.goalSteps.findIndex(
          (step) => step.id === action.payload
        );
        if (skippedStepIndex !== -1) {
          state.goalSteps[skippedStepIndex].skipped_at = new Date().toISOString();
        }
        if (state.todayStep?.id === action.payload) {
          state.todayStep = null;
        }
      })
      .addCase(swapStepAsync.fulfilled, (state, action) => {
        const oldStepIndex = state.goalSteps.findIndex(
          (step) => step.id === action.payload.id
        );
        if (oldStepIndex !== -1) {
          state.goalSteps[oldStepIndex] = action.payload;
        }
        if (state.todayStep?.id === action.payload.id) {
          state.todayStep = action.payload;
        }
      })
      .addCase(updateStepAsync.fulfilled, (state, action) => {
        const { stepId, updatedStep } = action.payload;
        const stepIndex = state.goalSteps.findIndex((step) => step.id === stepId);
        if (stepIndex !== -1) {
          state.goalSteps[stepIndex] = { ...state.goalSteps[stepIndex], ...updatedStep };
        }
        if (state.todayStep?.id === stepId) {
          state.todayStep = { ...state.todayStep, ...updatedStep };
        }
      });
  }
});

export default microStepSlice.reducer;