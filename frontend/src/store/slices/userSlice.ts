import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  isPremium: boolean;
  notificationTime: string | null;
  notificationsEnabled: boolean;
}

const initialState: UserState = {
  userId: null,
  email: null, 
  name: null,
  isPremium: false,
  notificationTime: '09:00',
  notificationsEnabled: true,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<{ userId: string; email: string; name: string }>) {
      state.userId = action.payload.userId;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    updateUserPremiumStatus(state, action: PayloadAction<boolean>) {
      state.isPremium = action.payload;
    },
    updateNotificationSettings(state, action: PayloadAction<{ time: string; enabled: boolean }>) {
      state.notificationTime = action.payload.time;
      state.notificationsEnabled = action.payload.enabled;
    },
    clearUser(state) {
      state.userId = null;
      state.email = null;
      state.name = null;
      state.isPremium = false;
      state.notificationTime = '09:00';
      state.notificationsEnabled = true;
    },
  },
});

export const { setUser, updateUserPremiumStatus, updateNotificationSettings, clearUser } = userSlice.actions;
export default userSlice.reducer;