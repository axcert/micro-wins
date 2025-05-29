import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateNotificationPreferences, fetchNotificationHistory } from '../api/notificationApi';

export const updatePreferences = createAsyncThunk(
  'notification/updatePreferences',
  async (preferences, { rejectWithValue }) => {
    try {
      const response = await updateNotificationPreferences(preferences);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getNotificationHistory = createAsyncThunk(
  'notification/getHistory',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await fetchNotificationHistory(userId);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    preferences: null,
    history: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updatePreferences.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferences.fulfilled, (state, action) => {
        state.preferences = action.payload;
        state.loading = false;
      })
      .addCase(updatePreferences.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(getNotificationHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotificationHistory.fulfilled, (state, action) => {
        state.history = action.payload;
        state.loading = false;
      })
      .addCase(getNotificationHistory.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default notificationSlice.reducer;