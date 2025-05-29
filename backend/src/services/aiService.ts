import { Configuration, OpenAIApi } from "openai";
import { Goal } from "./goalService";
import { addStepsToGoal } from "./stepService";
import * as Sentry from '@sentry/node';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const decomposeGoal = async (goal: Goal): Promise<void> => {
  try {
    const prompt = `Break down the following goal into 100 detailed, sequential steps:

Goal: ${goal.title} 
Category: ${goal.category}
Target Days: ${goal.targetDays}

Steps:
1.`;

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
    });
    
    const steps = completion.data.choices[0].text.trim().split('\n').map(step => step.replace(/^\d+\.\s*/, ''));
    
    await addStepsToGoal(goal.id, steps);

    // TODO: Implement cost tracking per request
    // TODO: Implement caching of similar goals
    // TODO: Add webhook for long running processing status updates

  } catch (error) {
    Sentry.captureException(error);
    throw error;
  }
};