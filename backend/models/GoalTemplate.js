const mongoose = require('mongoose');

const goalTemplateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: String,
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  steps: [{
    title: String,
    description: String  
  }]
});

module.exports = mongoose.model('GoalTemplate', goalTemplateSchema);