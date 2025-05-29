// ... existing imports ...

export const createGoal = async (title: string, category: string, difficulty: string): Promise<Goal> => {
  try {
    const response = await axiosInstance.post('/goals', { title, category, difficulty });
    console.log('Goal created successfully');
    return response.data;
  } catch (err) {
    console.error('Error creating goal:', err);
    throw err;
  }
};

// ... existing goal service code ...