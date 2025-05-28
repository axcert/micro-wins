const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    // TODO: Fetch analytics data from database
    const analyticsData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],  
      progress: [20, 45, 28, 80, 99, 43, 90],
      tasksCompleted: 25,
      consistencyPercentage: 80,
    };
    
    res.json(analyticsData);
  } catch (err) {
    console.error('Error fetching analytics:', err);
    res.status(500).json({ error: 'Server error' });  
  }
});

module.exports = router;