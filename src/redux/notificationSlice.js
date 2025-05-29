import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    preferences: {
      notificationsEnabled: true,
      notificationTime: '09:00',
    },
  },
  reducers: {
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
  },
});

export const { updatePreferences } = notificationSlice.actions;

export default notificationSlice.reducer;