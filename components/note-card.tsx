import React from 'react';
import { FaEllipsisV, FaRegTrashAlt } from 'react-icons/fa';
import { truncateText } from '@/lib/utils';
import { MdOutlineArchive } from 'react-icons/md';

interface NoteCardProps {
  title: string;
  content: string;
  imageUrl?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="bg-secondary/50 shadow-md rounded-lg border border-[#C085CA]/20 overflow-hidden">
      <div className="p-4">
        <h2 className="text-md font-semibold mb-2 text-primary/80">{title}</h2>
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-48 object-cover mb-2 rounded-lg"
          />
        )}
        <p className="text-primary/60">{truncateText(content, 100)}</p>
      </div>
      <div className="flex justify-end gap-3 items-center p-4 border-t">
        <MdOutlineArchive className="text-primary/60 size-5 cursor-pointer hover:text-primary" />
        <FaRegTrashAlt className="text-primary/60 cursor-pointer hover:text-primary" />
        <FaEllipsisV className="text-primary/80 cursor-pointer hover:text-primary" />
      </div>
    </div>
  );
};

export default NoteCard;
