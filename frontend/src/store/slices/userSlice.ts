import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  isPremium: boolean;
}

const initialState: UserState = {
  userId: null,
  email: null, 
  name: null,
  isPremium: false,
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
    clearUser(state) {
      state.userId = null;
      state.email = null;
      state.name = null;
      state.isPremium = false;
    },
  },
});

export const { setUser, updateUserPremiumStatus, clearUser } = userSlice.actions;
export default userSlice.reducer;