const express = require('express');
const router = express.Router();
const notificationService = require('../services/notificationService');

router.post('/token', async (req, res) => {
  try {
    const { token, platform } = req.body;
    await notificationService.saveToken(req.user.id, token, platform);
    res.status(200).json({ message: 'Token saved successfully' }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save token' });
  }
});

router.put('/preferences', async (req, res) => {
  try {
    const { enabled, time } = req.body;
    await notificationService.updatePreferences(req.user.id, enabled, time);
    res.status(200).json({ message: 'Preferences updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update preferences' });
  }  
});

router.post('/test', async (req, res) => {
  try {
    const { title, body } = req.body;
    await notificationService.sendTestNotification(req.user.id, title, body);
    res.status(200).json({ message: 'Test notification sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send test notification' }); 
  }
});

router.get('/history', async (req, res) => {
  try {
    const history = await notificationService.getNotificationHistory(req.user.id);
    res.status(200).json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve notification history' });
  }
});

router.delete('/token', async (req, res) => {
  try {
    await notificationService.deleteToken(req.user.id); 
    res.status(200).json({ message: 'Token deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete token' });
  }
});

module.exports = router;