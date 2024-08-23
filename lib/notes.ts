import { auth } from './auth';
import { Session } from './types/types';
import prisma from './db';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchNotes() {
  noStore();
  const session = (await auth()) as Session;

  try {
    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return notes;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw new Error('Failed to fetch notes');
  }
}
