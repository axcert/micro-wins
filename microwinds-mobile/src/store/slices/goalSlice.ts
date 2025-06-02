// Add these async thunks

export const fetchUserGoals = createAsyncThunk(
  'goals/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getUserGoals();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch goals'
      );
    }
  }
);

export const fetchTodaysStep = createAsyncThunk(
  'goals/fetchTodaysStep', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await goalService.getTodaysStep();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to fetch today\'s step'  
      );
    }
  }
);

// Modify extraReducers

builder
  .addCase(fetchUserGoals.fulfilled, (state, action) => {
    state.goals = action.payload;
    if (action.payload.length > 0 && !state.activeGoal) {
      state.activeGoal = action.payload.find(g => g.status === 'active') || action.payload[0];
    }
  })
  .addCase(fetchTodaysStep.fulfilled, (state, action) => {
    state.todaysStep = action.payload;  
  });