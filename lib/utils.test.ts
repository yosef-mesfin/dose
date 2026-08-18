import { cleanText, chunkedText, preprocessFile } from './utils';

describe('cleanText', () => {
  it('strips SRT timestamps and extra blank lines', () => {
    const input = 'Hello\n00:00:01,000 --> 00:00:02,000\n\nWorld';
    expect(cleanText(input)).toBe('Hello\nWorld');
  });
});

describe('chunkedText', () => {
  it('splits encoded text into chunks of the given byte size', () => {
    const chunks = chunkedText('abcdefghij', 4);
    expect(chunks.join('')).toBe('abcdefghij');
    expect(chunks.length).toBeGreaterThan(1);
  });
});

describe('preprocessFile', () => {
  it('returns a single chunk when text is under 4000 characters', async () => {
    const file = new File(['short note'], 'note.txt', { type: 'text/plain' });
    await expect(preprocessFile(file)).resolves.toEqual(['short note']);
  });

  it('chunks text longer than 4000 characters', async () => {
    const text = 'a'.repeat(5000);
    const file = new File([text], 'long.txt', { type: 'text/plain' });
    const chunks = await preprocessFile(file);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.join('')).toBe(text);
  });

  it('rejects unsupported file types', async () => {
    const file = new File(['%PDF'], 'doc.pdf', { type: 'application/pdf' });
    await expect(preprocessFile(file)).rejects.toThrow('Unsupported file type');
  });
});
