import express from 'express';
import * as progressController from '../controllers/progressController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/dashboard', authMiddleware, progressController.getDashboardSummary);
router.get('/streaks', authMiddleware, progressController.getStreaks); 
router.get('/timeline', authMiddleware, progressController.getProgressTimeline);
router.get('/stats', authMiddleware, progressController.getStatistics);
router.get('/achievements', authMiddleware, progressController.getAchievements);
router.get('/export', authMiddleware, progressController.exportProgressData);

export default router;