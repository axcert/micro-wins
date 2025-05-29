const Goal = require('../models/Goal');
const MicroStep = require('../models/MicroStep');
const aiService = require('./aiService');

exports.createGoal = async (userId, title, category, targetDays) => {
  try {
    const userGoalCount = await Goal.countDocuments({ user_id: userId });

    if (userGoalCount >= 3) {
      throw new Error('User has reached the maximum number of active goals');
    }

    const goal = await Goal.create({
      user_id: userId,
      title,
      category,
      target_days: targetDays,
      status: 'processing'
    });

    aiService.enqueueGoalDecomposition(goal.id);

    return goal.id;
  } catch (err) {
    console.error('Error creating goal:', err);
    throw err;
  }
};

exports.getGoals = async (userId, page, limit, category) => {
  try {
    const filter = { user_id: userId };

    if (category) {
      filter.category = category;
    }

    const goals = await Goal.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return goals;
  } catch (err) {
    console.error('Error retrieving goals:', err);
    throw err;
  }
};

exports.getGoal = async (userId, goalId) => {
  try {
    const goal = await Goal.findOne({ _id: goalId, user_id: userId });

    if (!goal) {
      return null;
    }

    const steps = await MicroStep.find({ goal_id: goalId }).sort({ order: 1 });

    return {
      ...goal.toObject(),
      steps
    };
  } catch (err) {
    console.error(`Error retrieving goal ${goalId}:`, err);
    throw err;
  }
};

exports.updateGoalStatus = async (userId, goalId, status) => {
  try {
    const goal = await Goal.findOne({ _id: goalId, user_id: userId });

    if (!goal) {
      throw new Error('Goal not found');
    }

    goal.status = status;
    await goal.save();
  } catch (err) {
    console.error(`Error updating status for goal ${goalId}:`, err);
    throw err;
  }
};

exports.deleteGoal = async (userId, goalId) => {
  try {
    await Goal.deleteOne({ _id: goalId, user_id: userId });
    await MicroStep.deleteMany({ goal_id: goalId });
  } catch (err) {
    console.error(`Error deleting goal ${goalId}:`, err);
    throw err;
  }
};

exports.getGoalTemplates = async () => {
  try {
    const templates = await Goal.find({ is_template: true });
    return templates;
  } catch (err) {
    console.error('Error retrieving goal templates:', err);
    throw err;
  }
};