// ...existing imports
import { AI_API_URL } from '../config';

export const goalSlice = createSlice({
  name: 'goal',
  initialState: {
    currentGoal: null,
    steps: [],
    // ...
  },
  reducers: {
    // ...
    setCurrentGoal: (state, action) => {
      state.currentGoal = action.payload;
    },
    setSteps: (state, action) => {
      state.steps = action.payload;
    },
  },
});

export const { setCurrentGoal, setSteps } = goalSlice.actions;

export const createGoal = (goal) => async (dispatch) => {
  try {
    const response = await fetch(`${AI_API_URL}/goals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    });
    const data = await response.json();
    dispatch(setCurrentGoal(data.goal));
    dispatch(setSteps(data.steps));
  } catch (error) {
    console.log('Error creating goal:', error);
    throw error;
  }
};

// ...existing code

export default goalSlice.reducer;