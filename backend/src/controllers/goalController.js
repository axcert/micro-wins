const goalService = require('../services/goalService');

exports.createGoal = async (req, res) => {
  try {
    const { title, category, targetDays } = req.body;
    const userId = req.user.id;

    const goalId = await goalService.createGoal(userId, title, category, targetDays);

    res.status(201).json({ goalId });
  } catch (err) {
    console.error('Error creating goal:', err);
    res.status(500).json({ error: 'Failed to create goal' });
  }
};

exports.getGoals = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10, category } = req.query;

    const goals = await goalService.getGoals(userId, page, limit, category);

    res.json(goals);
  } catch (err) {
    console.error('Error retrieving goals:', err);
    res.status(500).json({ error: 'Failed to retrieve goals' });
  }
};

exports.getGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const userId = req.user.id;

    const goal = await goalService.getGoal(userId, goalId);

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    res.json(goal);
  } catch (err) {
    console.error(`Error retrieving goal ${goalId}:`, err);
    res.status(500).json({ error: 'Failed to retrieve goal' });
  }
};

exports.updateGoalStatus = async (req, res) => {
  try {
    const goalId = req.params.id;
    const userId = req.user.id;
    const { status } = req.body;

    await goalService.updateGoalStatus(userId, goalId, status);

    res.json({ message: 'Goal status updated successfully' });
  } catch (err) {
    console.error(`Error updating status for goal ${goalId}:`, err);
    res.status(500).json({ error: 'Failed to update goal status' });
  }  
};

exports.deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    const userId = req.user.id;

    await goalService.deleteGoal(userId, goalId);

    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    console.error(`Error deleting goal ${goalId}:`, err);
    res.status(500).json({ error: 'Failed to delete goal' });
  }
};

exports.getGoalTemplates = async (req, res) => {
  try {
    const templates = await goalService.getGoalTemplates();
    res.json(templates);
  } catch (err) {
    console.error('Error retrieving goal templates:', err);
    res.status(500).json({ error: 'Failed to retrieve goal templates' });
  }
};