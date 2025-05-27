import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../services/Api';

export const completeTask = createAsyncThunk(
  'goal/completeTask',
  async (_, { getState }) => {
    const { currentStep } = getState().goal;
    await Api.completeTask(currentStep.id);
  }
);

export const skipTask = createAsyncThunk(
  'goal/skipTask', 
  async (_, { getState }) => {
    const { currentStep } = getState().goal;
    await Api.skipTask(currentStep.id);
  }
);

export const swapTask = createAsyncThunk(
  'goal/swapTask',
  async (_, { getState }) => {
    const { currentGoal } = getState().goal;
    const newStep = await Api.getAlternativeTask(currentGoal.id);
    return newStep;
  }
);

const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    currentGoal: null,
    currentStep: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(completeTask.fulfilled, (state) => {
      // TODO: Update state after completing task
    });
    builder.addCase(skipTask.fulfilled, (state) => {
      // TODO: Update state after skipping task 
    });
    builder.addCase(swapTask.fulfilled, (state, action) => {
      state.currentStep = action.payload;
    });
  },
});

export default goalSlice.reducer;