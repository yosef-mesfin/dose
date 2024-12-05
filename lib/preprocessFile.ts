'use server';
import { extractText, cleanText, chunkedText } from './utils';

// Preprocess file for summarization
export const preprocessFile = async (file: File): Promise<string[]> => {
  const text = await extractText(file);
  const cleanedText = cleanText(text);

  if (cleanText.length > 4000) {
    return chunkedText(cleanedText, 4000);
  }

  return [cleanedText];
};
