import { CreateNote } from '@/components/create-note';
import NoteLists from '@/components/note-lists';

export default async function Notes() {
  return (
    <div className="flex-1 flex flex-col overflow-y-scroll p-2">
      <div className="h-auto mt-3 p-2 flex items-center justify-center">
        <CreateNote />
      </div>
      <div className="flex-1 mt-6">
        <NoteLists isArchived={false} isTrashed={false} />
      </div>
    </div>
  );
}
