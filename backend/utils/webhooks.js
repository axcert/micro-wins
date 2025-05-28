const axios = require('axios');

const WEBHOOK_URL = process.env.WEBHOOK_URL;

async function sendProgressWebhook(goal, status) {
  try {
    await axios.post(WEBHOOK_URL, {
      goalId: goal._id,
      status: status,
    });
  } catch (err) {
    console.error('Error sending webhook:', err);
  }
}

module.exports = {
  sendProgressWebhook,
};