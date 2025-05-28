import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Api } from '../services/Api';

const initialState = {
  todaysTask: null,
  isLoading: false,
  error: null,
  offlineActions: [],
};

export const fetchTodaysTask = createAsyncThunk('tasks/fetchTodaysTask', async (_, { getState }) => {
  const { goals } = getState();
  const activeGoal = goals.find(goal => goal.status === 'active');
  const response = await Api.getTodaysTask(activeGoal.id);
  return response.task;
});

export const completeTask = createAsyncThunk('tasks/completeTask', async (_, { getState, dispatch }) => {
  const { tasks } = getState();
  const todaysTask = tasks.todaysTask;
  
  try {
    const response = await Api.completeTask(todaysTask.id);
    dispatch(fetchTodaysTask());
    return response;
  } catch (err) {
    dispatch(queueOfflineAction({ type: 'complete', taskId: todaysTask.id })); 
  }
});

export const skipTask = createAsyncThunk('tasks/skipTask', async (_, { getState, dispatch }) => {
  const { tasks } = getState(); 
  const todaysTask = tasks.todaysTask;

  try {
    const response = await Api.skipTask(todaysTask.id);
    dispatch(fetchTodaysTask());
    return response;
  } catch (err) {
    dispatch(queueOfflineAction({ type: 'skip', taskId: todaysTask.id }));
  }
});

export const swapTask = createAsyncThunk('tasks/swapTask', async (_, { getState, dispatch }) => {
  const { goals, tasks } = getState();
  const activeGoal = goals.find(goal => goal.status === 'active');
  const todaysTask = tasks.todaysTask;

  try {
    const response = await Api.swapTask(activeGoal.id); 
    dispatch(setTodaysTask(response.task));
    return response;
  } catch (err) {
    dispatch(queueOfflineAction({ type: 'swap', goalId: activeGoal.id, oldTaskId: todaysTask.id }));
  }
});

export const syncOfflineActions = createAsyncThunk('tasks/syncOfflineActions', async (_, { getState, dispatch }) => {
  const { tasks } = getState();
  const offlineActions = tasks.offlineActions;

  if (offlineActions.length === 0) return;

  try {
    await Api.syncOfflineActions(offlineActions);
    dispatch(clearOfflineActions());
    dispatch(fetchTodaysTask());
  } catch (err) {
    console.error('Error syncing offline actions:', err);
  }
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTodaysTask(state, action) {
      state.todaysTask = action.payload;
    },
    queueOfflineAction(state, action) {
      state.offlineActions.push(action.payload);
    },
    clearOfflineActions(state) {
      state.offlineActions = [];
    }, 
  },
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
        state.error = action.error.message;
      });
  },
});

export const { setTodaysTask, queueOfflineAction, clearOfflineActions } = tasksSlice.actions;
export default tasksSlice.reducer;