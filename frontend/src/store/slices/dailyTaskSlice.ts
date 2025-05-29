import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../index';
import { DailyTask, fetchDailyTask, completeTask, skipTask, swapTask } from '../../services/api/dailyTaskService';

interface DailyTaskState {
  task: DailyTask | null;
  loading: boolean;
  error: string | null;  
}

const initialState: DailyTaskState = {
  task: null,
  loading: false,
  error: null,
};

export const dailyTaskSlice = createSlice({
  name: 'dailyTask',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTask: (state, action: PayloadAction<DailyTask | null>) => {
      state.task = action.payload;
    },
  },
});

export const { setLoading, setError, setTask } = dailyTaskSlice.actions;

export const selectDailyTask = (state: RootState) => state.dailyTask.task;
export const selectIsLoading = (state: RootState) => state.dailyTask.loading;
export const selectError = (state: RootState) => state.dailyTask.error;

export const fetchTask = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const task = await fetchDailyTask(dispatch);
    dispatch(setTask(task)); 
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(setError(err.toString()));
    dispatch(setLoading(false));
  }
};

export const markTaskCompleted = (taskId: string): AppThunk => async (dispatch) => {
  try {
    await completeTask(taskId);
    dispatch(fetchTask());
  } catch (err) {
    dispatch(setError(err.toString())); 
  }
};

export const markTaskSkipped = (taskId: string): AppThunk => async (dispatch) => {  
  try {
    await skipTask(taskId);
    dispatch(fetchTask());
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export const swapOutTask = (taskId: string): AppThunk => async (dispatch) => {
  try {
    const newTask = await swapTask(taskId);
    dispatch(setTask(newTask));
  } catch (err) {
    dispatch(setError(err.toString()));
  }
};

export default dailyTaskSlice.reducer;