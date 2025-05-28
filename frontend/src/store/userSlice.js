import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const syncNotificationSettings = createAsyncThunk(
  'user/syncNotificationSettings',
  async (_, { getState }) => {
    const { user } = getState();
    try {
      await axios.post(`${API_URL}/users/${user.id}/notification-settings`, { 
        notificationToken: user.notificationToken
      });
    } catch (err) {
      console.error('Error syncing notification settings:', err);
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    email: '',
    name: '',
    notificationToken: null,
  },
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    saveNotificationToken: (state, action) => {
      state.notificationToken = action.payload;
    },
  },
});

export const { setUser, saveNotificationToken } = userSlice.actions;

export default userSlice.reducer;