const { Configuration, OpenAIApi } = require("openai");
const Redis = require('redis');
const { sendProgressWebhook } = require('../utils/webhooks');
const Goal = require('../models/Goal');
const MicroStep = require('../models/MicroStep');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MAX_TOKENS = 2048;

const redisClient = Redis.createClient({
  url: process.env.REDIS_URL
});

class GoalDecompositionJob {
  static get key() {
    return 'App\\Jobs\\GoalDecompositionJob';  
  }

  async handle(goalId) {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      console.error(`Goal ${goalId} not found`);
      return;
    }

    await redisClient.connect();
    const cacheKey = `goal_steps:${goal.title}`;
    const cachedSteps = await redisClient.get(cacheKey);
    if (cachedSteps) {
      console.log(`Using cached steps for goal: ${goal.title}`);
      await this.saveSteps(goalId, JSON.parse(cachedSteps));
      await redisClient.disconnect();
      return;
    }

    const prompt = this.generatePrompt(goal);

    try {
      await sendProgressWebhook(goal, 'processing');
      const steps = await this.generateSteps(prompt);
      await this.saveSteps(goalId, steps);
      await redisClient.set(cacheKey, JSON.stringify(steps), 'EX', 86400); // Cache for 24 hours
      await sendProgressWebhook(goal, 'completed');
    } catch (err) {
      console.error(`Error generating steps for goal ${goalId}:`, err);
      await sendProgressWebhook(goal, 'failed');
    } finally {
      await redisClient.disconnect();
    }
  }

  generatePrompt(goal) {
    return `Decompose the following goal into 100 detailed, sequential steps:

Goal: ${goal.title} 
Category: ${goal.category}
Target Days: ${goal.target_days}

Steps:
1.`;
  }

  async generateSteps(prompt) {
    const configuration = new Configuration({
      apiKey: OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: OPENAI_MAX_TOKENS,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const steps = completion.data.choices[0].text
      .trim()
      .split('\n')
      .map(step => step.replace(/^\d+\.\s*/, ''));

    return steps;
  }

  async saveSteps(goalId, steps) {
    await MicroStep.deleteMany({ goal_id: goalId });
    
    const microSteps = steps.map((title, index) => ({
      goal_id: goalId,
      title: title, 
      order: index + 1,
    }));

    await MicroStep.insertMany(microSteps);
  }
}

module.exports = GoalDecompositionJob;