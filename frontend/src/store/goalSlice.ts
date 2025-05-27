import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from './store';

interface Goal {
  id: string;
  title: string; 
  progress: number;
  streak: number;
  completedSteps: number;
  remainingSteps: number;
  daysLeft: number;
}

interface Task {
  id: string;
  goalId: string;
  order: number;
  description: string;
  completed: boolean;
}

interface GoalState {
  active: Goal | null;
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GoalState = {
  active: null,
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchGoalProgress = createAsyncThunk('goals/fetchProgress', async () => {
  const response = await axios.get('/api/goals/active');
  return response.data;
});

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalProgress.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoalProgress.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.active = action.payload.goal;
        state.tasks = action.payload.tasks;
      })
      .addCase(fetchGoalProgress.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Something went wrong';
      });
  },
});

export const selectActiveGoal = (state: RootState) => state.goals.active;
export const selectTodaysTask = (state: RootState) => 
  state.goals.tasks.find((task) => task.order === state.goals.active?.completedSteps);

export default goalSlice.reducer;