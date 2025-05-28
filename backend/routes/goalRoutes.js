const express = require('express');
const router = express.Router();
const openai = require('../utils/openai');
const Goal = require('../models/Goal');

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const filter = {};
    if (category) filter.category = category;
    
    const goals = await Goal.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.json(goals);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id).populate('steps');
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, category, difficulty } = req.body;
    
    // Validate goal limit
    const goalCount = await Goal.countDocuments({ user: req.user._id });
    if (goalCount >= 3) {
      return res.status(400).json({ error: 'Exceeded maximum active goals' });
    }

    const goal = new Goal({ 
      user: req.user._id,
      title,
      category,
      difficulty
    });
    await goal.save();

    // Enqueue AI processing job
    await generateSteps(goal);

    res.status(201).json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, category, difficulty } = req.body;
    const goal = await Goal.findByIdAndUpdate(
      req.params.id, 
      { title, category, difficulty },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });  
    }
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/activate', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { status: 'active' },
      { new: true }  
    );
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/:id/pause', async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { status: 'paused' },
      { new: true }
    );
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json(goal);
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/templates', async (req, res) => {
  try {
    const templates = await GoalTemplate.find({});
    res.json(templates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

async function generateSteps(goal) {
  try {
    const prompt = `Generate 100 sequential micro-steps to achieve this goal:
    Goal: ${goal.title}
    Category: ${goal.category} 
    Difficulty: ${goal.difficulty}

    Return the steps as a JSON array, with each step having an id, title, and description.
    Ensure the steps show logical progression toward the end goal.`;

    const steps = await openai.generateSteps(prompt);

    goal.steps = steps.map(step => ({ 
      goal: goal._id,
      title: step.title,
      description: step.description
    }));
    await goal.save();

  } catch (err) {
    console.error('Failed to generate steps:', err);
  }
}

module.exports = router;