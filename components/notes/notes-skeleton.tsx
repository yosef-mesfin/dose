import React from 'react';
import { cn } from '@/lib/utils';

const NotesSkeleton = () => {
  const skeletonCards = Array(16).fill(0); // Adjust the number as needed

  return (
    <div
      className={cn('grid gap-3', {
        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4': true,
      })}
    >
      {skeletonCards.map((_, index) => (
        <div
          key={index}
          className="h-48 dark:bg-secondary/70 rounded-md animate-pulse"
        ></div>
      ))}
    </div>
  );
};

export default NotesSkeleton;
