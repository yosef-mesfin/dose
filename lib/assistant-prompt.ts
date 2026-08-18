export function buildAssistantPrompt(input: {
  prompt?: string;
  content?: string[];
}): string {
  const prompt = input.prompt?.trim() ?? '';
  const fileText = (input.content ?? []).join('\n').trim();

  if (prompt && fileText) {
    return `${prompt}\n\n---\n\n${fileText}`;
  }
  if (prompt) return prompt;
  if (fileText) return `Summarize the following text:\n\n${fileText}`;

  throw new Error('Nothing to generate');
}
