const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils/asyncHandler');
const { Goal, MicroStep } = require('../models');

// List steps for a goal
router.get('/goals/:goalId/steps', asyncHandler(async (req, res) => {
  const { goalId } = req.params;
  const steps = await MicroStep.findAll({ where: { goal_id: goalId } });
  res.json(steps);
}));

// Get today's step
router.get('/steps/today', asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const today = new Date();
  const todayStep = await MicroStep.findOne({ 
    where: { 
      user_id: userId,
      completed_at: null,
      createdAt: {
        [Op.lte]: today
      }
    },
    order: [['createdAt', 'ASC']]
  });
  res.json(todayStep);
}));

// Mark step as complete 
router.post('/steps/:id/complete', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const step = await MicroStep.findByPk(id);
  if (!step) {
    res.status(404).json({ error: 'Step not found' });
  } else {
    step.completed_at = new Date();
    await step.save();
    res.json(step);
  }
}));

// Skip step with reason
router.post('/steps/:id/skip', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;
  const step = await MicroStep.findByPk(id);
  if (!step) {
    res.status(404).json({ error: 'Step not found' }); 
  } else {
    step.skipped_at = new Date();
    step.skip_reason = reason;
    await step.save();
    res.json(step);
  }
}));

// Swap step for alternative
router.post('/steps/:id/swap', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { alternativeStep } = req.body;
  const step = await MicroStep.findByPk(id);
  if (!step) {
    res.status(404).json({ error: 'Step not found' });
  } else {
    step.title = alternativeStep.title;
    step.description = alternativeStep.description;
    await step.save();
    res.json(step);
  }
}));

// Update step details
router.put('/steps/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const [updatedRows, [updatedStep]] = await MicroStep.update(updates, {
    where: { id },
    returning: true,
  });
  if (updatedRows === 0) {
    res.status(404).json({ error: 'Step not found' });
  } else {
    res.json(updatedStep);
  }
}));

// Get step history
router.get('/steps/:id/history', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const history = await MicroStep.findAll({ 
    where: { id },
    order: [['updatedAt', 'DESC']]
  });
  res.json(history);
}));

module.exports = router;