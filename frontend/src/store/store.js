import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './goalsSlice';
import analyticsReducer from './analyticsSlice';

export default configureStore({
  reducer: {
    goals: goalsReducer,
    analytics: analyticsReducer,
  },
});