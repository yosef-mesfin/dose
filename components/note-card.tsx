'use client';

import React from 'react';
import { FaEllipsisV, FaRegTrashAlt } from 'react-icons/fa';
import { getMessageFromCode, truncateText } from '@/lib/utils';
import { ResultCode } from '@/lib/types/types';
import { MdOutlineArchive, MdOutlineUnarchive } from 'react-icons/md';
import {
  archiveNote,
  deleteNote,
  restoreNote,
  trashNote,
  unarchiveNote,
} from '@/app/(notes)/actions';
import { usePathname } from 'next/navigation';
import { IoMdRefresh } from 'react-icons/io';
import EditNoteModal from './edit-note-modal';
import { toast } from 'sonner';

interface NoteCardProps {
  noteId: string;
  title: string;
  content: string;
  imageUrls?: string[];
  onClick?: () => void;
}

const NoteCard: React.FC<NoteCardProps> = ({
  noteId,
  title,
  content,
  imageUrls,
}) => {
  const path = usePathname();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleArchive = async () => {
    try {
      const result = await archiveNote(noteId);
      if (result.type === 'success') {
        toast.success(getMessageFromCode(result.resultCode));
      }
    } catch (error) {
      toast.error(getMessageFromCode(ResultCode.UnknownError));
    }
  };

  const handleUnarchive = async () => {
    try {
      const result = await unarchiveNote(noteId);
      if (result.type === 'success') {
        toast.success(getMessageFromCode(result.resultCode));
      }
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  const handleDeleteNote = async () => {
    try {
      const result = await deleteNote(noteId);
      if (result.type === 'success') {
        toast.success(getMessageFromCode(result.resultCode));
      }
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleTrashNote = async () => {
    try {
      const result = await trashNote(noteId);
      if (result.type === 'success') {
        toast.success(getMessageFromCode(result.resultCode));
      }
    } catch (error) {
      console.error('Error trashing note:', error);
    }
  };

  const handleRestoreNote = async () => {
    try {
      const result = await restoreNote(noteId);
      if (result.type === 'success') {
        toast.success(getMessageFromCode(result.resultCode));
      }
    } catch (error) {
      console.error('Error restoring note:', error);
    }
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeEditModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-secondary/50 shadow-md rounded-lg border border-[#C085CA]/20 overflow-hidden">
        <div
          className="p-4 hover:bg-secondary/70 cursor-pointer"
          onClick={openEditModal}
        >
          <h2 className="text-md font-semibold mb-2 text-primary/80">
            {title}
          </h2>
          {imageUrls && (
            <img
              src={imageUrls[0]}
              alt={title}
              className="w-full h-48 object-cover mb-2 rounded-lg"
            />
          )}
          <p className="text-primary/60">{truncateText(content, 100)}</p>
        </div>
        <div className="flex justify-end gap-3 items-center p-4 border-t">
          {/* Show buttons based on the current route */}
          {path === '/notes' && (
            <>
              <MdOutlineArchive
                className="text-primary/60 size-5 cursor-pointer hover:text-primary"
                onClick={handleArchive}
              />
              <FaRegTrashAlt
                className="text-primary/60 cursor-pointer hover:text-primary"
                onClick={handleTrashNote}
              />
            </>
          )}

          {path === '/archive' && (
            <>
              <MdOutlineUnarchive
                className="text-primary/60 size-5 cursor-pointer hover:text-primary"
                onClick={handleUnarchive}
              />
              <FaRegTrashAlt
                className="text-primary/60 cursor-pointer hover:text-primary"
                onClick={handleTrashNote}
              />
            </>
          )}

          {path === '/trash' && (
            <>
              <FaRegTrashAlt
                className="text-primary/60 cursor-pointer hover:text-primary"
                onClick={handleDeleteNote} // Delete the note permanently
              />
              <IoMdRefresh
                className="text-primary/60 size-6 cursor-pointer hover:text-primary"
                onClick={handleRestoreNote} // Restore the note from trash
              />
            </>
          )}
          <FaEllipsisV className="text-primary/80 cursor-pointer hover:text-primary" />
        </div>
      </div>
      {isModalOpen && (
        <EditNoteModal
          noteId={noteId}
          title={title}
          content={content}
          imageUrls={imageUrls || []}
          onClose={closeEditModal}
          isOpen={isModalOpen}
        />
      )}
    </>
  );
};

export default NoteCard;
