'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/db';
import { Result, Session } from '@/lib/types/types';
import { ResultCode } from '@/lib/types/types';
import { Note } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getNote(noteId: string) {
  const note = prisma.note.findUnique({
    where: { id: noteId },
  });
  return note;
}

interface INotesQuery {
  isArchived?: boolean;
  isTrashed?: boolean;
}

export async function getNotes({
  isArchived,
  isTrashed,
}: INotesQuery): Promise<Result<Note[]>> {
  const session = (await auth()) as Session;

  if (!session || !session.user?.id) {
    throw new Error('Invalid session');
  }

  try {
    const notes: Note[] = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        isArchived: isArchived,
        isTrashed: isTrashed,
      },
      orderBy: { createdAt: 'desc' },
    });
    return {
      type: 'success',
      resultCode: ResultCode.NoteFetchSuccess,
      data: notes,
    };
  } catch (error) {
    console.error('Error fetching notes:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteFetchFailed,
    };
  }
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

    revalidatePath('/notes');

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
    revalidatePath('/notes');
    return {
      type: 'success',
      resultCode: ResultCode.NoteUpdated,
    };
  } catch (error) {
    console.error('Error updating note:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteUpdateFailed,
    };
  }
}

export async function trashNote(noteId: string) {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: { isTrashed: true },
    });
    revalidatePath('/notes');
    revalidatePath('/trash');
    return {
      type: 'success',
      resultCode: ResultCode.NoteTrashed,
    };
  } catch (error) {
    console.error('Error trashing note:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteTrashFailed,
    };
  }
}

export async function restoreNote(noteId: string) {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: { isTrashed: false },
    });
    revalidatePath('/notes');
    revalidatePath('/trash');
    return {
      type: 'success',
      resultCode: ResultCode.NoteRestored,
    };
  } catch (error) {
    console.error('Error restoring note:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteRestoreFailed,
    };
  }
}

export async function deleteNote(noteId: string) {
  try {
    await prisma.note.delete({
      where: { id: noteId },
    });

    revalidatePath('/trash');
    return {
      type: 'success',
      resultCode: ResultCode.NoteDeleted,
    };
  } catch (error) {
    console.error('Error deleting note:', error);

    return {
      type: 'error',
      resultCode: ResultCode.NoteDeletionFailed,
    };
  }
}

export async function archiveNote(noteId: string) {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: { isArchived: true },
    });
    revalidatePath('/notes');
    revalidatePath('/archive');
    return {
      type: 'success',
      resultCode: ResultCode.NoteArchived,
    };
  } catch (error) {
    console.error('Error archiving note:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteArchiveFailed,
    };
  }
}

export async function unarchiveNote(noteId: string) {
  try {
    await prisma.note.update({
      where: { id: noteId },
      data: { isArchived: false },
    });
    revalidatePath('/notes');
    revalidatePath('/archive');
    return {
      type: 'success',
      resultCode: ResultCode.NoteUnArchived,
    };
  } catch (error) {
    console.error('Error unarchiving note:', error);
    return {
      type: 'error',
      resultCode: ResultCode.NoteUnarchiveFailed,
    };
  }
}
