const cron = require('node-cron');
const admin = require('firebase-admin');
const userRepository = require('../repositories/userRepository');

async function sendDailyNotifications() {
  const users = await userRepository.getUsersWithEnabledNotifications();

  for (const user of users) {
    const localTime = convertToUserTimezone(user.notificationTime, user.timezone);
    
    if (localTime.getHours() === new Date().getHours()) {
      const message = {
        notification: {
          title: "Today's Micro-Win",
          body: user.currentTask.title
        },
        token: user.notificationToken
      };

      try {
        await admin.messaging().send(message);
        console.log(`Notification sent to user ${user.id}`);
      } catch (err) {
        console.error(`Failed to send notification to user ${user.id}:`, err);
      }
    }
  }
}

function convertToUserTimezone(time, timezone) {
  // TODO: Implement timezone conversion logic
  return new Date(time);
}

// Schedule daily notifications
cron.schedule('0 * * * *', async () => {
  await sendDailyNotifications();
});