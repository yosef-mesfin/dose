import OpenAi from 'openai';

export const client = new OpenAi({
  apiKey: process.env.OPENAI_API_KEY,
});
