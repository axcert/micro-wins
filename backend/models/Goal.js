const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MicroStep'
  }],
  status: {
    type: String,
    enum: ['active', 'paused', 'completed'],
    default: 'active'  
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Goal', goalSchema);