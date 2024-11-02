'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { TextArea } from './ui/textfield';
import { ImagePreview } from './note-image-previews';
import { convertToBase64 } from '@/lib/utils';
import { useAutoResize } from '@/lib/hooks/use-autoresize';
import { LoadingSpinner } from './ui/loading-spinner';
import { MdOutlineClose } from 'react-icons/md';
import useAutosave from '@/lib/hooks/use-autosave';
import Button from './ui/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import { FaRegFileImage } from 'react-icons/fa';
import { AiOutlineMore } from 'react-icons/ai';
import { SummaryModal } from './summary-modal';
import { cn } from '@/lib/utils';

interface EditNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId: string;
  title: string;
  content: string;
  imageUrls: string[];
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  isOpen,
  onClose,
  noteId,
  title: initialTitle,
  content: initialContent,
  imageUrls: initialImageUrls,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [textContent, setTextContent] = useState(initialContent);
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Autosave Hook - only starts saving when changes happen
  const { isSaving, cancelSave, setCurrentNoteId } = useAutosave({
    noteId,
    title,
    textContent,
    imageUrls,
  });

  useAutoResize(inputRef, textContent);

  // handle add summary to the text content
  const handleAddSummary = (summary: string) => {
    setTextContent((prev) => prev + summary);
    setSummaryModalOpen(false);
  };

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelSave();
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [cancelSave, onClose]);

  // Close modal on clicking outside the modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        cancelSave();
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [cancelSave, onClose]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImageUrls((prev) => [...prev, base64]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const removeImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    // If the modal opens with a different note, update the current note ID for autosave.
    setCurrentNoteId(noteId);
  }, [noteId, setCurrentNoteId]);

  const handleOpenModal = () => {
    setSummaryModalOpen(true);
  };

  const handleCloseModal = () => {
    setSummaryModalOpen(false);
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 overflow-y-auto">
        <div
          ref={modalRef}
          className={cn(
            'relative bg-secondary dark:bg-dark-700 border-[#ACB0B1] rounded-lg shadow-lg transition-all w-2/5 p-3'
          )}
        >
          {/* Loading Spinner only appears when there are changes */}
          {isSaving ? (
            <LoadingSpinner className="absolute top-2 right-3" />
          ) : (
            <Button
              variant="icon"
              icon={
                <MdOutlineClose className="size-7 text-primary/50 hover:text-primary/90" />
              }
              className="absolute top-0 right-1"
              onClick={() => {
                cancelSave();
                onClose();
              }}
            />
          )}

          {/* Title Input */}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mb-2 mt-2 w-full font-semibold text-lg bg-transparent outline-none border-b"
          />

          {/* Image Previews */}
          <ImagePreview imageUrls={imageUrls} removeImage={removeImage} />

          {/* Content Textarea */}
          <TextArea
            ref={inputRef}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Take a note..."
            className="w-full bg-transparent min-h-12 border-none outline-none overflow-y-auto "
          />

          {/* Modal Footer for Assistant, Images, and Other Options */}
          <div className="flex bg-primary/10 justify-between items-center px-3 py-1 mx-[-.75rem] mb-[-.75rem]">
            <Button
              variant="ghost"
              className="flex space-x-1 items-center cursor-pointer group"
              onClick={handleOpenModal}
            >
              <RiOpenaiFill className="size-7 text-[#9834aa] group-hover:animate-pulse" />
              <span className="text-sm text-primary/50 group-hover:text-primary/90">
                Assistant
              </span>
            </Button>

            <div className="flex flex-row">
              <Button
                variant="icon"
                className="text-primary/80 hover:text-primary/100"
                icon={
                  <FaRegFileImage className="size-5 text-primary/50 hover:text-primary/90" />
                }
                onClick={() => fileInputRef.current?.click()}
              />
              <Input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png, .webp"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <Button
                variant="icon"
                className="text-primary/80 hover:text-primary/100"
                icon={
                  <AiOutlineMore className="size-7 text-primary/50 hover:text-primary/90" />
                }
              />
            </div>
          </div>
        </div>
        <SummaryModal
          onAddSummary={handleAddSummary}
          isOpen={isSummaryModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    )
  );
};

export default EditNoteModal;
