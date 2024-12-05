import { getNotes } from '@/app/(notes)/actions';
import { cache } from 'react';
import { Note, Result } from './types/types';

interface ILoadNotesProps {
  isArchived?: boolean;
  isTrashed?: boolean;
}

export const loadNotes = cache(
  async ({ isArchived, isTrashed }: ILoadNotesProps = {}): Promise<
    Result<Note[]>
  > => {
    return await getNotes({ isArchived, isTrashed });
  }
);
