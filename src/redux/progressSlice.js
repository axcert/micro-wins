// ...existing imports

const progressSlice = createSlice({
  name: 'progress',
  initialState: {
    completedSteps: 0,
    totalSteps: 100,
    // ...
  },
  reducers: {
    incrementCompletedSteps: (state) => {
      state.completedSteps += 1;
    },
    // ...
  },
});

export const { incrementCompletedSteps } = progressSlice.actions;

export default progressSlice.reducer;