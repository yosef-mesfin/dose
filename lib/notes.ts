import { getNotes } from '@/app/(notes)/actions';
import { cache } from 'react';
import { Note, Result } from './types/types';

interface ILoadNotesProps {
  isArchived?: boolean;
  isTrashed?: boolean;
  query?: string;
}

export const loadNotes = cache(
  async ({
    isArchived,
    isTrashed,
    query,
  }: ILoadNotesProps = {}): Promise<Result<Note[]>> => {
    return await getNotes({ isArchived, isTrashed, query });
  }
);
