import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildAssistantPrompt } from './assistant-prompt';

export function getGeminiModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL || 'gemini-2.0-flash',
  });
}

export async function generateAssistantReply(input: {
  prompt?: string;
  content?: string[];
}): Promise<string> {
  const prompt = buildAssistantPrompt(input);
  const model = getGeminiModel();
  const result = await model.generateContent(prompt);
  const text = result.response.text();
  return text?.trim() || 'No response available';
}
