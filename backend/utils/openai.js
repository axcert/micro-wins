const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateSteps(prompt) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    max_tokens: 2000,
    temperature: 0.7
  });
  
  const stepsJson = completion.data.choices[0].text;
  const steps = JSON.parse(stepsJson);
  return steps;
}

module.exports = {
  generateSteps
};