'use server';

import { client } from '../openai';

export const generateSummary = async (content: string[]): Promise<string> => {
  // summarize each chunk
  const summaries = await Promise.all(
    content.map((chunk) => summarizeChunks(chunk))
  );

  return summaries.join('\n');
};

async function summarizeChunks(chunk: string): Promise<string> {
  const response = await client.chat.completions
    .create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'summarize the following text',
        },
        {
          role: 'user',
          content: chunk,
        },
      ],
    })
    .withResponse();

  return response.data.choices[0].message.content || 'No summaries available';
}
