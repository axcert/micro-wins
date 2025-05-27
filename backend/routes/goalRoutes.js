const express = require('express');
const router = express.Router();
const openai = require('../utils/openai');

router.post('/generate-steps', async (req, res) => {
  try {
    const {goal, difficulty, category} = req.body;

    const prompt = `Generate 100 sequential micro-steps to achieve this goal:
    Goal: ${goal}  
    Category: ${category}
    Difficulty: ${difficulty}
    
    Return the steps as a JSON array, with each step having an id, title, and description.
    Ensure the steps show logical progression toward the end goal.`;
    
    const steps = await openai.generateSteps(prompt);
    
    res.json(steps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;