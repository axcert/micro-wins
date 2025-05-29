// Add these imports 
import { PayloadAction } from '@reduxjs/toolkit';
import { MicroStep } from '../../types/GoalTypes';

// Add these to extraReducers
builder
  .addCase(swapTask.type, (state, action: PayloadAction<{oldTaskId: string, newTask: MicroStep}>) => {
    const { activeGoal } = state;
    if (activeGoal) {
      const index = activeGoal.steps.findIndex(step => step.id === action.payload.oldTaskId);
      if (index !== -1) {
        activeGoal.steps[index] = action.payload.newTask;
      }
    }
  })
  .addCase(updateTask.type, (state, action: PayloadAction<{taskId: string, completed: boolean}>) => {
    const { activeGoal } = state;
    if (activeGoal) {  
      const task = activeGoal.steps.find(step => step.id === action.payload.taskId);
      if (task) {
        task.completedAt = action.payload.completed ? new Date().toISOString() : null;
      }
    }
  });

// Add these action creators  
export const swapTask = createAction<{oldTaskId: string, newTask: MicroStep}>('goal/swapTask');
export const updateTask = createAction<{taskId: string, completed: boolean}>('goal/updateTask');