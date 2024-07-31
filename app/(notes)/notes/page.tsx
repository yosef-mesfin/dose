'use client';

import { useSidebar } from '@/lib/hooks/use-sidebar';
import { CreateNote } from '@/components/create-note';
import NotesSkeleton from '@/components/notes-skeleton';

export default function Notes() {
  const { isSidebarOpen } = useSidebar();

  return (
    <>
      <div className="flex-1 flex flex-col overflow-y-scroll p-2">
        <div className="h-auto mt-3 p-2 flex items-center justify-center">
          <CreateNote />
        </div>
        <div className="flex-1 mt-4">
          <NotesSkeleton />
        </div>
      </div>
    </>
  );
}
