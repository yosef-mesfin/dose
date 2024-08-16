'use client';
import { useEffect, useState } from 'react';
import { CreateNote } from '@/components/create-note';
import NotesSkeleton from '@/components/notes-skeleton';
import NoteCard from '@/components/note-card';

export default function Notes() {
  const [isLoading, setLoading] = useState(true);

  const notes = Array(16).fill(0);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-y-scroll p-2">
      <div className="h-auto mt-3 p-2 flex items-center justify-center">
        <CreateNote />
      </div>
      <div className="flex-1 mt-6">
        {isLoading ? (
          <NotesSkeleton />
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {notes.map((_, index) => (
              <NoteCard
                key={index}
                title="My First Note"
                content="This is the content of my first note. It's a simple note-taking app."
                imageUrl="/images/generic-image-placeholder.png"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
