import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ResultCode } from './types/types';

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const generateStarPositions = (count: number, color: string) => {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);

    positions.push(`${x}px ${y}px ${color}`);
  }
  return positions.join(', ');
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

const errorMessages: { [key in ResultCode]: string } = {
  [ResultCode.InvalidCredentials]: 'Invalid credentials!',
  [ResultCode.InvalidSubmission]: 'Invalid submission, please try again!',
  [ResultCode.UserAlreadyExists]: 'User already exists, please log in!',
  [ResultCode.UserCreated]: 'User created, welcome!',
  [ResultCode.UnknownError]: 'Something went wrong, please try again!',
  [ResultCode.UserLoggedIn]: 'Logged in!',
  [ResultCode.NoteCreated]: 'Note created!',
  [ResultCode.NoteDeleted]: 'Note deleted!',
  [ResultCode.NoteUpdated]: 'Note updated!',
  [ResultCode.NoteNotFound]: 'Note not found!',
  [ResultCode.NoteArchived]: 'Note archived!',
  [ResultCode.NoteRestored]: 'Note restored!',
  [ResultCode.NoteTrashed]: 'Note trashed!',
  [ResultCode.NoteCreationFailed]: 'Note creation failed!',
  [ResultCode.NoteDeletionFailed]: 'Note deletion failed!',
  [ResultCode.SummaryFailed]: 'Summary generation failed!',
  [ResultCode.NoteUnArchived]: 'Note unarchived!',
  [ResultCode.NoteUpdateFailed]: 'Note update failed!',
  [ResultCode.NoteArchiveFailed]: 'Note archive failed!',
  [ResultCode.NoteTrashFailed]: 'Note trash failed!',
  [ResultCode.NoteUnarchiveFailed]: 'Note unarchive failed!',
  [ResultCode.NoteRestoreFailed]: 'Note restore failed!',
  [ResultCode.NoteFetchFailed]: 'Note fetch failed!',
  [ResultCode.NoteFetchSuccess]: 'Note fetch success!',
};

export const getMessageFromCode = (resultCode: ResultCode): string => {
  return errorMessages[resultCode] || errorMessages[ResultCode.UnknownError];
};

export const convertToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => reject(error);
  });

// Preprocess file for summarization
export const preprocessFile = async (file: File): Promise<string[]> => {
  const text = await extractText(file);
  const cleanedText = cleanText(text);

  if (cleanText.length > 4000) {
    return chunkedText(cleanedText, 4000);
  }

  return [cleanedText];
};

export const cleanText = (text: string): string => {
  return text
    .replace(/\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, '') // Remove SRT timestamps
    .replace(/\n\s*\n/g, '\n') // Remove extra newlines
    .trim();
};

export const chunkedText = (text: string, chunkSize: number): string[] => {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);
  const chunks: string[] = [];

  for (let i = 0; i < encodedText.length; i += chunkSize) {
    chunks.push(new TextDecoder().decode(encodedText.slice(i, i + chunkSize)));
  }
  return chunks;
};

export const extractText = async (file: File): Promise<string> => {
  const fileType = file.type;

  if (fileType === 'application/pdf') {
    // extract from pdf
    throw new Error('Unsupported file type');
  }

  // read text when plain
  if (fileType === 'text/plain') {
    return await file.text();
  }

  // read text when .srt
  if (file.name.endsWith('.srt')) {
    return await file.text();
  }

  throw new Error('Unsupported file type');
};
