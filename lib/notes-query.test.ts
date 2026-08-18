import { buildNotesWhere } from './notes-query';

describe('buildNotesWhere', () => {
  it('filters by user and archive/trash flags', () => {
    expect(
      buildNotesWhere({ userId: 'u1', isArchived: false, isTrashed: false })
    ).toEqual({
      userId: 'u1',
      isArchived: false,
      isTrashed: false,
    });
  });

  it('adds case-insensitive title/content contains when query is set', () => {
    expect(
      buildNotesWhere({
        userId: 'u1',
        isArchived: false,
        isTrashed: false,
        query: '  hello  ',
      })
    ).toMatchObject({
      OR: [
        { title: { contains: 'hello', mode: 'insensitive' } },
        { content: { contains: 'hello', mode: 'insensitive' } },
      ],
    });
  });

  it('ignores blank query', () => {
    const where = buildNotesWhere({
      userId: 'u1',
      query: '   ',
    });
    expect(where.OR).toBeUndefined();
  });
});
