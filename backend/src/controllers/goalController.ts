... 
import { decomposeGoal } from '../services/aiService';

...

export const createGoal = async (req: Request, res: Response) => {
  try {
    const { title, category, targetDays } = req.body;

    const goal = await goalService.createGoal({
      userId: req.userId,
      title,
      category, 
      targetDays,
    });

    // Queue goal decomposition job
    await Queue.add(() => decomposeGoal(goal));

    res.status(201).json(goal);
  } catch (error) {
    console.error('Failed to create goal', error);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};
...