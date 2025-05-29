import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

export const fetchGoalProgress = createAsyncThunk('goal/fetchProgress', async (_, { getState }) => {
  const { auth: { token } } = getState();
  const response = await api.get('/goal/progress', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

export const fetchTodaysTask = createAsyncThunk('goal/fetchTodaysTask', async (_, { getState }) => {
  const { auth: { token } } = getState();
  const response = await api.get('/goal/today', {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
});

const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    currentGoal: null,
    goalProgress: 0,
    todaysTask: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalProgress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGoalProgress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentGoal = action.payload.goal;
        state.goalProgress = action.payload.progress;
        state.error = null;
      })
      .addCase(fetchGoalProgress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTodaysTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodaysTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todaysTask = action.payload;
        state.error = null;
      })
      .addCase(fetchTodaysTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default goalSlice.reducer;