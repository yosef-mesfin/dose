import { loadNotes } from '@/lib/notes';
import NoteCard from './note-card';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdOutlineArchive } from 'react-icons/md';
import { toast } from 'sonner';

interface NoteListsProps {
  isArchived?: boolean;
  isTrashed?: boolean;
}

export default async function NoteLists({
  isArchived,
  isTrashed,
}: NoteListsProps) {
  const noteResult = await loadNotes({ isArchived, isTrashed });

  if (noteResult.type === 'error') {
    return toast.error(noteResult.resultCode);
  }

  const notes = noteResult.data;

  if (!notes || notes.length === 0) {
    return isTrashed ? (
      <div className="flex flex-col items-center mt-[20%] gap-2">
        <FaRegTrashAlt className="w-16 h-16 text-primary/60" />
        <p className="text-primary/60">Trash empty</p>
      </div>
    ) : isArchived ? (
      <div className="flex flex-col items-center mt-[20%] gap-2">
        <MdOutlineArchive className="w-16 h-16 text-primary/60" />
        <p className="text-primary/60">No archived notes</p>
      </div>
    ) : (
      <div className="flex flex-col items-center m-[20%] gap-2">
        <p className="text-primary/60">No notes found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {notes?.map((note, index) => (
        <NoteCard
          key={index}
          noteId={note.id}
          title={note.title ?? ''}
          content={note.content ?? ''}
          imageUrls={note.imageUrls}
        />
      ))}
    </div>
  );
}
