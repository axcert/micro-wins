// Add this to the top of the file
const Queue = require('bee-queue');
const GoalDecompositionJob = require('../queues/GoalDecompositionJob');

const goalQueue = new Queue(GoalDecompositionJob.key, {
  redis: process.env.REDIS_URL,
});

// Add this inside the goal creation route handler 
app.post('/goals', async (req, res) => {
  try {
    const goal = await Goal.create(req.body);

    await goalQueue.createJob(goal._id).save();

    res.status(201).json(goal);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating goal' });
  }
});