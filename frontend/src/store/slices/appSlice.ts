import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  isOffline: boolean;
}

const initialState: AppState = {
  isOffline: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.isOffline = action.payload;
    },
  },
});

export const { setOfflineMode } = appSlice.actions;

export default appSlice.reducer;