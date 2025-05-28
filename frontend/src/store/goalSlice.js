import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/goals/generate-steps', goalData);
      return response.data;
    } catch (err) {
      console.error('Failed to generate steps:', err);
      return rejectWithValue(err.response.data);
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState: { 
    currentGoal: null,
    generatedSteps: [],
    isGenerating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isGenerating = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isGenerating = false;
        state.currentGoal = action.meta.arg;
        state.generatedSteps = action.payload; 
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isGenerating = false;
        state.error = action.payload;
      });
  },
});

export default goalSlice.reducer;