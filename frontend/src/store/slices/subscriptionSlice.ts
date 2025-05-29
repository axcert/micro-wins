import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subscription } from '../../services/api/subscriptionService';

interface SubscriptionState {
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  subscription: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setSubscription: (state, action: PayloadAction<Subscription | null>) => {
      state.subscription = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSubscription, setLoading, setError } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;