import express from 'express';
import { registerNotificationToken, updateNotificationPreferences, sendTestNotification, getNotificationHistory, unregisterNotificationToken } from '../controllers/notificationController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/token', authMiddleware, registerNotificationToken);
router.put('/preferences', authMiddleware, updateNotificationPreferences);
router.post('/test', authMiddleware, sendTestNotification);
router.get('/history', authMiddleware, getNotificationHistory);
router.delete('/token', authMiddleware, unregisterNotificationToken);

export default router;