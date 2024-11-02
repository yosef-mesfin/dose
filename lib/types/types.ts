/* eslint-disable */
export type Session = {
  user: {
    id: string;
    email: string;
  };
};

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN',

  // Notes
  NoteCreated = 'NOTE_CREATED',
  NoteUpdated = 'NOTE_UPDATED',
  NoteArchived = 'NOTE_ARCHIVED',
  NoteTrashed = 'NOTE_TRASHED',
  NoteDeleted = 'NOTE_DELETED',
  NoteUnArchived = 'NOTE_UNARCHIVED',
  NoteRestored = 'NOTE_RESTORED',
  NoteNotFound = 'NOTE_NOT_FOUND',
  NoteCreationFailed = 'NOTE_CREATION_FAILED',
  NoteUpdateFailed = 'NOTE_UPDATE_FAILED',
  NoteArchiveFailed = 'NOTE_ARCHIVE_FAILED',
  NoteTrashFailed = 'NOTE_TRASH_FAILED',
  NoteDeletionFailed = 'NOTE_DELETION_FAILED',
  NoteUnarchiveFailed = 'NOTE_UNARCHIVE_FAILED',
  NoteRestoreFailed = 'NOTE_RESTORE_FAILED',
  NoteFetchFailed = 'NOTE_FETCH_FAILED',
  NoteFetchSuccess = 'NOTE_FETCH_SUCCESS',

  // Summary
  SummaryFailed = 'SUMMARY_GENERATION_FILED',
}

export type Result<T> =
  | {
      type: 'success';
      resultCode: ResultCode;
      data: T;
    }
  | {
      type: 'error';
      resultCode: ResultCode;
    };

export type Note = {
  id: string;
  title: string | null;
  content: string | null;
  imageUrls: string[];
  isArchived: boolean;
  isTrashed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};
