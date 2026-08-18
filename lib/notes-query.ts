import type { Prisma } from '@prisma/client';

export function buildNotesWhere(params: {
  userId: string;
  isArchived?: boolean;
  isTrashed?: boolean;
  query?: string;
}): Prisma.NoteWhereInput {
  const where: Prisma.NoteWhereInput = {
    userId: params.userId,
    isArchived: params.isArchived,
    isTrashed: params.isTrashed,
  };
  const query = params.query?.trim();
  if (query) {
    where.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { content: { contains: query, mode: 'insensitive' } },
    ];
  }
  return where;
}
