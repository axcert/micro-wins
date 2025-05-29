import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTask, completeTask, skipTask, swapTask } from '../../services/api/taskService';
import { Task } from '../../types/TaskTypes';

interface TaskState {
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  currentTask: null,
  isLoading: false,
  error: null,
};

export const fetchCurrentTask = createAsyncThunk(
  'task/fetchCurrent',
  async (_, { rejectWithValue }) => {
    try {
      const task = await fetchTask();
      return task;
    } catch (err) {
      console.error('Error fetching current task:', err);
      return rejectWithValue('Failed to fetch current task');
    }
  }
);

export const completeCurrentTask = createAsyncThunk(
  'task/completeCurrent',
  async (_, { getState, rejectWithValue }) => {
    const { task } = getState() as { task: TaskState };
    
    if (!task.currentTask) {
      return rejectWithValue('No current task to complete');
    }

    try {
      await completeTask(task.currentTask.id);
    } catch (err) {
      console.error('Error completing task:', err);
      return rejectWithValue('Failed to complete task');
    }
  }
);

export const skipCurrentTask = createAsyncThunk(
  'task/skipCurrent',
  async (_, { getState, rejectWithValue }) => {
    const { task } = getState() as { task: TaskState };
    
    if (!task.currentTask) {
      return rejectWithValue('No current task to skip');
    }

    try {
      await skipTask(task.currentTask.id);
    } catch (err) {
      console.error('Error skipping task:', err);
      return rejectWithValue('Failed to skip task');  
    }
  }
);

export const swapCurrentTask = createAsyncThunk(
  'task/swapCurrent',
  async (_, { getState, rejectWithValue }) => {
    const { task } = getState() as { task: TaskState };
    
    if (!task.currentTask) {
      return rejectWithValue('No current task to swap');
    }

    try {
      const newTask = await swapTask(task.currentTask.id);
      return newTask;
    } catch (err) {
      console.error('Error swapping task:', err);
      return rejectWithValue('Failed to swap task');
    }
  }
);

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentTask = action.payload;
      })
      .addCase(fetchCurrentTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(completeCurrentTask.fulfilled, (state) => {
        state.currentTask = null;
      })
      .addCase(skipCurrentTask.fulfilled, (state) => {
        state.currentTask = null;
      })
      .addCase(swapCurrentTask.fulfilled, (state, action) => {
        state.currentTask = action.payload;
      });
  },
});

export default taskSlice.reducer;