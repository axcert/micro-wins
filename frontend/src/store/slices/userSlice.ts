import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  // ...existing state
  subscriptionStatus: 'active' | 'inactive' | 'expired';
  isPremium: boolean;
  notificationsEnabled: boolean;
  notificationTime: string;
}

const initialState: UserState = {
  // ...existing state
  subscriptionStatus: 'inactive', 
  isPremium: false,
  notificationsEnabled: true,
  notificationTime: '09:00',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ...existing reducers
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
      state.isPremium = action.payload === 'active';
    },
    setNotificationsEnabled: (state, action) => {
      state.notificationsEnabled = action.payload;
    },
    setNotificationTime: (state, action) => {
      state.notificationTime = action.payload;
    }
  }
});

export const { setSubscriptionStatus, setNotificationsEnabled, setNotificationTime } = userSlice.actions;

export default userSlice.reducer;