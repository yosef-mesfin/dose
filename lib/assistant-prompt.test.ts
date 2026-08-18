import { buildAssistantPrompt } from './assistant-prompt';

describe('buildAssistantPrompt', () => {
  it('returns the prompt when only a prompt is provided', () => {
    expect(buildAssistantPrompt({ prompt: '  rewrite this  ' })).toBe(
      'rewrite this'
    );
  });

  it('summarizes joined chunks when only file content is provided', () => {
    expect(buildAssistantPrompt({ content: ['hello', 'world'] })).toBe(
      'Summarize the following text:\n\nhello\nworld'
    );
  });

  it('puts the prompt above file content when both are provided', () => {
    expect(
      buildAssistantPrompt({ prompt: 'extract actions', content: ['alpha'] })
    ).toBe('extract actions\n\n---\n\nalpha');
  });

  it('throws when there is nothing to generate', () => {
    expect(() => buildAssistantPrompt({})).toThrow('Nothing to generate');
    expect(() => buildAssistantPrompt({ prompt: '   ', content: [] })).toThrow(
      'Nothing to generate'
    );
  });
});
