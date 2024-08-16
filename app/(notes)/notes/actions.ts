'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { Session } from '@/lib/types/types';
import { ResultCode } from '@/lib/utils';

export async function getNote(noteId: string) {
  const note = prisma.note.findUnique({
    where: { id: noteId },
  });
  return note;
}

export async function createNote(
  title: string,
  content: string,
  imageUrls: string[]
) {
  const session = (await auth()) as Session;

  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        imageUrls,
        userId: session.user.id,
      },
    });

    return note;
  } catch (error) {
    console.error('Error creating note:', error);
    throw new Error('Note creation failed');
  }
}

export async function updateNote(
  noteId: string,
  data: { title: string; content: string; imageUrls: string[] }
) {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data,
    });
    return {
      type: 'success',
      resultCode: ResultCode.NoteUpdated,
    };
  } catch (error) {
    console.error('Error updating note:', error);
    throw new Error('Note update failed');
  }
}

export async function deleteNote(noteId: string) {
  try {
    await prisma.note.delete({
      where: { id: noteId },
    });
    return {
      type: 'success',
      resultCode: ResultCode.NoteDeleted,
    };
  } catch (error) {
    console.error('Error deleting note:', error);
    // throw new Error('Note deletion failed');
    return {
      type: 'error',
      resultCode: ResultCode.NoteDeletionFailed,
    };
  }
}
