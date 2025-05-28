const admin = require('firebase-admin');
const userRepository = require('../repositories/userRepository');

async function saveToken(userId, token, platform) {
  await userRepository.updateUser(userId, { notificationToken: token, notificationPlatform: platform });
}

async function updatePreferences(userId, enabled, time) {
  await userRepository.updateUser(userId, { notificationsEnabled: enabled, notificationTime: time });
}

async function sendTestNotification(userId, title, body) {
  const user = await userRepository.getUserById(userId);
  
  if (!user.notificationToken) {
    throw new Error('No notification token found for user');
  }

  const message = {
    notification: {
      title: title,
      body: body
    },
    token: user.notificationToken
  };

  await admin.messaging().send(message);
}

async function getNotificationHistory(userId) {
  // TODO: Implement retrieving notification history from database
  return [];
}

async function deleteToken(userId) {
  await userRepository.updateUser(userId, { notificationToken: null, notificationPlatform: null });
}

module.exports = {
  saveToken,
  updatePreferences,
  sendTestNotification,
  getNotificationHistory,
  deleteToken
};