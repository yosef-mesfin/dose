'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import { createNote, updateNote, getNote } from '@/app/(notes)/notes/actions';
import { useDebounceCallback } from 'usehooks-ts';

interface AutoSaveNotes {
  title: string;
  content: string;
  imageUrls: string[];
  noteId: string | null;
}

function useAutosave<T extends AutoSaveNotes>(value: T, delay: number = 5000) {
  const { noteId, title, content, imageUrls } = value;
  const [isSaving, setSaving] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<string | null>(noteId);

  // Ref to avoid recreating functions unnecessarily
  const isSavingRef = useRef(isSaving);
  const currentNoteIdRef = useRef(currentNoteId);

  // Update refs when state changes
  useEffect(() => {
    isSavingRef.current = isSaving;
  }, [isSaving]);

  useEffect(() => {
    currentNoteIdRef.current = currentNoteId;
  }, [currentNoteId]);

  const saveNote = useCallback(async () => {
    if (!title && !content && imageUrls.length === 0) {
      console.log('No content to save.');
      return;
    }

    if (isSavingRef.current) {
      console.log('Save operation already in progress.');
      return;
    }

    setSaving(true);

    try {
      if (currentNoteIdRef.current) {
        const existingNote = await getNote(currentNoteIdRef.current);

        if (existingNote) {
          await updateNote(currentNoteIdRef.current, {
            title,
            content,
            imageUrls,
          });
          console.log('Note updated successfully.');
        }
      } else {
        const newNote = await createNote(title, content, imageUrls);
        setCurrentNoteId(newNote.id);
        console.log('New note created successfully.');
      }
    } catch (error) {
      console.error('Failed to save note:', error);
    } finally {
      setSaving(false);
    }
  }, [title, content, imageUrls]);

  const debouncedSave = useDebounceCallback(saveNote, delay);

  const cancelSave = useCallback(() => {
    debouncedSave.cancel();
    setSaving(false);
  }, [debouncedSave]);

  useEffect(() => {
    if (title || content || imageUrls.length > 0) {
      debouncedSave();
    }

    return () => {
      debouncedSave.cancel();
    };
  }, [title, content, imageUrls, debouncedSave]);

  return { isSaving, currentNoteId, setCurrentNoteId, cancelSave };
}

export default useAutosave;
