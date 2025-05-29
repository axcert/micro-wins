import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as goalApi from '../api/goalApi';
import * as aiApi from '../api/aiApi';

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async (goal, { rejectWithValue }) => {
    try {
      const data = await goalApi.createGoal(goal);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGoalStatus = createAsyncThunk(
  'goals/fetchGoalStatus',
  async (goalId, { rejectWithValue }) => {
    try {
      const data = await goalApi.fetchGoalStatus(goalId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGoalSteps = createAsyncThunk(
  'goals/fetchGoalSteps',
  async (goalId, { rejectWithValue }) => {
    try {
      const data = await goalApi.fetchGoalSteps(goalId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const requestGoalDecomposition = createAsyncThunk(
  'goals/requestGoalDecomposition',
  async (goalId, { rejectWithValue }) => {
    try {
      const data = await goalApi.requestGoalDecomposition(goalId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const overrideGoalSteps = createAsyncThunk(
  'goals/overrideGoalSteps',
  async ({ goalId, steps }, { rejectWithValue }) => {
    try {
      const data = await goalApi.overrideGoalSteps(goalId, steps);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }  
);

export const fetchAIProviders = createAsyncThunk(
  'goals/fetchAIProviders',
  async (_, { rejectWithValue }) => {
    try {
      const data = await aiApi.fetchAIProviders();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAIUsageCosts = createAsyncThunk(
  'goals/fetchAIUsageCosts',
  async (providerId, { rejectWithValue }) => {
    try {
      const data = await aiApi.fetchAIUsageCosts(providerId);
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);  
    }
  }
);

export const cacheGoalDecomposition = createAsyncThunk(
  'goals/cacheGoalDecomposition',
  async ({ goal, steps }, { rejectWithValue }) => {
    try {
      const data = await aiApi.cacheGoalDecomposition(goal, steps);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const goalSlice = createSlice({
  name: 'goals',
  initialState: {
    activeGoals: [],
    goalStatus: {},
    goalSteps: {},
    aiProviders: [],
    aiUsageCosts: {},
    goalDecompositionCache: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    // ...
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.activeGoals.push(action.payload);
      })  
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ... other cases
      .addCase(requestGoalDecomposition.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestGoalDecomposition.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(requestGoalDecomposition.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // ... other cases
  },
});

export const { /* ... */ } = goalSlice.actions;

export default goalSlice.reducer;