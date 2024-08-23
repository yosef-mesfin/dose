import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN',

  // Notes
  NoteCreated = 'NOTE_CREATED',
  NoteDeleted = 'NOTE_DELETED',
  NoteUpdated = 'NOTE_UPDATED',
  NoteNotFound = 'NOTE_NOT_FOUND',
  NoteCreationFailed = 'NOTE_CREATION_FAILED',
  NoteDeletionFailed = 'NOTE_DELETION_FAILED',
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCode.InvalidCredentials:
      return 'Invalid credentials!';
    case ResultCode.InvalidSubmission:
      return 'Invalid submission, please try again!';
    case ResultCode.UserAlreadyExists:
      return 'User already exists, please log in!';
    case ResultCode.UserCreated:
      return 'User created, welcome!';
    case ResultCode.UnknownError:
      return 'Something went wrong, please try again!';
    case ResultCode.UserLoggedIn:
      return 'Logged in!';
    case ResultCode.NoteCreated:
      return 'Note created!';
    case ResultCode.NoteCreationFailed:
      return 'Note creation failed!';
  }
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
