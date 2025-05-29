import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  subscriptionStatus: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
  },
});

export const { setSubscriptionStatus } = subscriptionSlice.actions;

export default subscriptionSlice.reducer;