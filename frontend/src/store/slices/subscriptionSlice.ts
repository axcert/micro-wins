import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchSubscriptionStatus } from '../../services/api/subscriptionService';
import { AppThunk } from '../index';

interface SubscriptionState {
  status: 'active' | 'inactive' | 'trialing' | 'canceled';
  plan: SubscriptionPlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionState = {
  status: 'inactive',
  plan: null,
  loading: false,
  error: null,
};

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<'active' | 'inactive' | 'trialing' | 'canceled'>) => {
      state.status = action.payload;
    },
    setPlan: (state, action: PayloadAction<SubscriptionPlan>) => {
      state.plan = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setStatus, setPlan, setLoading, setError } = subscriptionSlice.actions;

export const fetchSubscription = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const status = await fetchSubscriptionStatus();
    dispatch(setStatus(status));
  } catch (err) {
    dispatch(setError(err.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default subscriptionSlice.reducer;