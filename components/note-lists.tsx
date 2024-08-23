import { fetchNotes } from '@/lib/notes';
import NoteCard from './note-card';

export default async function NoteLists() {
  const noteData = await fetchNotes();
  return (
    <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {noteData?.map((note, index) => (
        <NoteCard
          key={index}
          title={note.title ?? ''}
          content={note.content ?? ''}
          imageUrl={note.imageUrls[0]}
        />
      ))}
    </div>
  );
}
