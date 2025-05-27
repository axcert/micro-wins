import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationsEnabled: true,
  notificationTime: new Date(Date.now()),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateNotificationSettings(state, action) {
      return { ...state, ...action.payload };  
    },
  },
});

export const { updateNotificationSettings } = userSlice.actions;
export default userSlice.reducer;