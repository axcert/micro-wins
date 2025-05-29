import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MicroStep } from '../../types/GoalTypes';

interface GoalState {
  currentGoalId: string | null;
  currentGoalStatus: 'processing' | 'completed' | null;
  currentGoalMicroSteps: MicroStep[];
}

const initialState: GoalState = {
  currentGoalId: null,
  currentGoalStatus: null,
  currentGoalMicroSteps: []
};

const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    setCurrentGoalId: (state, action: PayloadAction<string>) => {
      state.currentGoalId = action.payload;
    },
    setCurrentGoalStatus: (state, action: PayloadAction<'processing' | 'completed'>) => {
      state.currentGoalStatus = action.payload;
    },
    setCurrentGoalMicroSteps: (state, action: PayloadAction<MicroStep[]>) => {
      state.currentGoalMicroSteps = action.payload;
    },
    clearGoalState: (state) => {
      state.currentGoalId = null;
      state.currentGoalStatus = null;
      state.currentGoalMicroSteps = [];
    }
  }
});

export const { setCurrentGoalId, setCurrentGoalStatus, setCurrentGoalMicroSteps, clearGoalState } = goalSlice.actions;

export default goalSlice.reducer;