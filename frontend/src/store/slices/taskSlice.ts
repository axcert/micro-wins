import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as taskService from '../../services/api/taskService';
import { TaskType } from '../../types/TaskTypes';

interface TaskState {
  todaysTask: TaskType | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  todaysTask: null,
  isLoading: false,
  error: null,
};

export const fetchTodaysTask = createAsyncThunk(
  'task/fetchTodaysTask',
  async () => {
    const task = await taskService.fetchTodaysTask();
    return task;
  }
);

export const completeTask = createAsyncThunk(
  'task/completeTask',
  async (taskId: string) => {
    await taskService.completeTask(taskId);
  }
);

export const skipTask = createAsyncThunk(
  'task/skipTask',
  async (taskId: string) => {
    await taskService.skipTask(taskId);
  }
);

export const swapTask = createAsyncThunk(
  'task/swapTask',
  async (taskId: string) => {
    const newTask = await taskService.swapTask(taskId);
    return newTask;
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
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
        state.error = action.error.message ?? 'Failed to fetch task';
      })
      .addCase(completeTask.fulfilled, (state) => {
        if (state.todaysTask) {
          state.todaysTask.completed = true;  
        }
      })
      .addCase(swapTask.fulfilled, (state, action) => {
        state.todaysTask = action.payload;
      });
  },
});

export default taskSlice.reducer;