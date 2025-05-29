const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');
const auth = require('../middleware/auth');

router.post('/', auth, goalController.createGoal);
router.get('/', auth, goalController.getGoals);
router.get('/:id', auth, goalController.getGoal);
router.put('/:id', auth, goalController.updateGoalStatus);
router.delete('/:id', auth, goalController.deleteGoal);
router.post('/:id/activate', auth, (req, res) => goalController.updateGoalStatus(req, res, 'active'));
router.post('/:id/pause', auth, (req, res) => goalController.updateGoalStatus(req, res, 'paused'));
router.get('/templates', goalController.getGoalTemplates);

module.exports = router;