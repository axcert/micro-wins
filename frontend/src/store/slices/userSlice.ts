import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  // ...existing state
  subscriptionStatus: 'active' | 'inactive' | 'expired';
  isPremium: boolean;
}

const initialState: UserState = {
  // ...existing state 
  subscriptionStatus: 'inactive',
  isPremium: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // ...existing reducers
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
      state.isPremium = action.payload === 'active';
    }
  }
});

export const { setSubscriptionStatus } = userSlice.actions;

export default userSlice.reducer;