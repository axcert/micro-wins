import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  subscriptionStatus: 'none',
  loading: false,
  error: null,
};

export const fetchSubscriptionStatus = createAsyncThunk(
  'subscription/fetchStatus',
  async () => {
    const response = await axios.get('/api/subscription/status');
    return response.data.status;
  }
);

export const purchaseSubscription = createAsyncThunk(
  'subscription/purchase',
  async () => {
    // TODO: Implement Stripe payment flow
    const response = await axios.post('/api/subscription/purchase', { 
      /* payment data */ 
    });
    return response.data.status;
  }
);

export const restoreSubscription = createAsyncThunk(
  'subscription/restore', 
  async () => {
    const response = await axios.post('/api/subscription/restore');
    return response.data.status;
  }
);

const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubscriptionStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptionStatus = action.payload;
      })
      .addCase(fetchSubscriptionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(purchaseSubscription.fulfilled, (state, action) => {
        state.subscriptionStatus = action.payload;
      })
      .addCase(restoreSubscription.fulfilled, (state, action) => {
        state.subscriptionStatus = action.payload;  
      });
  },
});

export default subscriptionSlice.reducer;