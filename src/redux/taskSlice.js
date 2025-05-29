import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskApi from '../api/taskApi';

export const fetchTodaysTask = createAsyncThunk(
  'task/fetchTodaysTask',
  async (userId, { rejectWithValue }) => {
    try {
      const task = await taskApi.fetchTodaysTask(userId);
      return task;
    } catch (error) {
      console.error('Error fetching today\'s task:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeTask = createAsyncThunk(
  'task/completeTask',
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      await taskApi.completeTask(userId, taskId);
    } catch (error) {
      console.error('Error completing task:', error);
      return rejectWithValue(error.response.data);
    }
  }  
);

export const skipTask = createAsyncThunk(
  'task/skipTask',
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      await taskApi.skipTask(userId, taskId);
    } catch (error) {
      console.error('Error skipping task:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const swapTask = createAsyncThunk(
  'task/swapTask',
  async ({ userId, taskId }, { rejectWithValue }) => {
    try {
      const newTask = await taskApi.swapTask(userId, taskId);
      return newTask;
    } catch (error) {
      console.error('Error swapping task:', error);
      return rejectWithValue(error.response.data);
    }
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    todaysTask: null,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodaysTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTodaysTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todaysTask = action.payload;
      })
      .addCase(fetchTodaysTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(swapTask.fulfilled, (state, action) => {
        state.todaysTask = action.payload;
      });
  },
});

export default taskSlice.reducer;