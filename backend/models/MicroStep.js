const mongoose = require('mongoose');

const microStepSchema = new mongoose.Schema({
  goal: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Goal',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true  
});

module.exports = mongoose.model('MicroStep', microStepSchema);