import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  completedTasks: [],
  currentStreak: 0,
  longestStreak: 0,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    addCompletedTask: (state, action) => {
      state.completedTasks.push(action.payload);
    },
    updateStreak: (state) => {
      const today = new Date().toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const latestTask = state.completedTasks[state.completedTasks.length - 1];

      if (latestTask && new Date(latestTask.completedAt).toDateString() === today) {
        state.currentStreak += 1;
      } else if (latestTask && new Date(latestTask.completedAt).toDateString() === yesterday) {
        state.currentStreak = 1;
      } else {
        state.currentStreak = 0;
      }

      if (state.currentStreak > state.longestStreak) {
        state.longestStreak = state.currentStreak;
      }
    },
  },
});

export const { addCompletedTask, updateStreak } = progressSlice.actions;
export default progressSlice.reducer;