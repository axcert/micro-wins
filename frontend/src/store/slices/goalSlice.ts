import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Goal } from '../../services/api/goalService';

interface GoalState {
  currentGoal: Goal | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  currentGoal: null,
  isLoading: false,
  error: null,
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    goalCreationStarted(state) {
      state.isLoading = true;
      state.error = null;
    },
    goalCreationSucceeded(state, action: PayloadAction<Goal>) {
      state.isLoading = false;
      state.currentGoal = action.payload;
    },
    goalCreationFailed(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    goalFetched(state, action: PayloadAction<Goal>) {
      state.isLoading = false;
      state.currentGoal = action.payload;
    },
  },
});

export const {
  goalCreationStarted,
  goalCreationSucceeded, 
  goalCreationFailed,
  goalFetched,
} = goalSlice.actions;

export default goalSlice.reducer;