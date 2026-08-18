'use server';

import { generateAssistantReply } from '../gemini';

export const generateSummary = async (
  content: string[] = [],
  prompt = ''
): Promise<string> => {
  return generateAssistantReply({ prompt, content });
};
