import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  offlineMode: boolean;
  error: string | null;
}

const initialState: AppState = {
  offlineMode: false,
  error: null,  
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setOfflineMode(state, action: PayloadAction<boolean>) {
      state.offlineMode = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setOfflineMode, setError } = appSlice.actions;
export default appSlice.reducer;

export const selectOfflineMode = (state: RootState) => state.app.offlineMode;
export const selectError = (state: RootState) => state.app.error;