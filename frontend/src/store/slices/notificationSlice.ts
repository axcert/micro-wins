import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotificationPreferences } from '../../types/NotificationTypes';

interface NotificationState {
  token: string | null;
  preferences: NotificationPreferences;
}

const initialState: NotificationState = {
  token: null,
  preferences: {
    notificationTime: '09:00',
    notificationDays: [1, 2, 3, 4, 5],
    notificationGoals: []
  }
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setNotificationPreferences: (state, action: PayloadAction<NotificationPreferences>) => {
      state.preferences = action.payload;
    }
  }
});

export const { setNotificationToken, setNotificationPreferences } = notificationSlice.actions;

export default notificationSlice.reducer;