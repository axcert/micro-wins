const express = require('express');
const router = express.Router();
const progressController = require('../controllers/progressController');

router.get('/dashboard', progressController.getDashboardSummary);
router.get('/streaks', progressController.getStreakData);
router.get('/timeline', progressController.getProgressTimeline);
router.get('/stats', progressController.getCompletionStats);
router.get('/achievements', progressController.getAchievements);
router.get('/export', progressController.exportUserData);

module.exports = router;