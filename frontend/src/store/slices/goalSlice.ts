import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as goalService from '../../services/api/goalService';

export const createGoal = createAsyncThunk(
  'goals/createGoal',
  async ({ title, category, difficulty }: { title: string, category: string, difficulty: string }) => {
    const goal = await goalService.createGoal(title, category, difficulty);
    return goal;
  }
);

// ... existing goal slice code ...