// ... existing imports ...

// Add the following:
export const fetchTask = async (): Promise<Task> => {
  try {
    const response = await axiosInstance.get<Task>('/tasks/current');
    return response.data;
  } catch (err) {
    console.error('Error fetching current task:', err);
    throw err;
  }
};

export const completeTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/tasks/${taskId}/complete`);
    console.log('Task completed successfully');
  } catch (err) {
    console.error('Error completing task:', err);
    throw err;
  }
};

export const skipTask = async (taskId: string): Promise<void> => {
  try {
    await axiosInstance.patch(`/tasks/${taskId}/skip`);
    console.log('Task skipped successfully');
  } catch (err) {
    console.error('Error skipping task:', err);
    throw err;
  }
};

export const swapTask = async (taskId: string): Promise<Task> => {
  try {
    const response = await axiosInstance.post<Task>(`/tasks/${taskId}/swap`);
    return response.data;
  } catch (err) {
    console.error('Error swapping task:', err);
    throw err;
  }
};