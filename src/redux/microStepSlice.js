// ...existing imports
import api from '../api';
import { AI_API_URL } from '../config';

const microStepSlice = createSlice({
  name: 'microStep',
  initialState: {
    currentMicroStep: null,
    microSteps: [],
    loading: false,
    error: null,
  },
  reducers: {
    // ...existing reducers
  },
  extraReducers: (builder) => {
    // ...existing extraReducers
    builder.addCase(completeMicroStep.fulfilled, (state, action) => {
      // ...
    });

    builder.addCase(skipMicroStep.fulfilled, (state, action) => {
      const currentIndex = state.microSteps.findIndex((step) => step.id === action.payload);
      const nextIndex = (currentIndex + 1) % state.microSteps.length;
      state.currentMicroStep = state.microSteps[nextIndex];
    });

    builder.addCase(swapMicroStep.fulfilled, (state, action) => {
      const currentIndex = state.microSteps.findIndex((step) => step.id === action.meta.arg);
      state.microSteps[currentIndex] = action.payload;
      state.currentMicroStep = action.payload;
    });
  },
});

// ...

export const completeMicroStep = createAsyncThunk(
  'microStep/complete',
  async (microStepId) => {
    const response = await api.put(`/micro-steps/${microStepId}`, { completed: true });
    return response.data;
  }
);

export const skipMicroStep = createAsyncThunk(
  'microStep/skip',
  async (microStepId) => {
    // Just return the skipped step ID to advance in extraReducer
    return microStepId;  
  }
);

export const swapMicroStep = createAsyncThunk(
  'microStep/swap',
  async (microStepId) => {
    const response = await api.post(`${AI_API_URL}/micro-steps/swap`, { microStepId });
    return response.data;
  }
);

export const { setLoading, setError } = microStepSlice.actions;

export default microStepSlice.reducer;