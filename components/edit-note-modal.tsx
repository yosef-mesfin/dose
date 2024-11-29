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
import { useModal } from '@/lib/hooks/use-modal';
import { Dialog } from './ui/dialog';

interface IEditNoteModalProps {
  // isOpen: boolean;
  onClose: () => void;
  noteId: string;
  title: string;
  content: string;
  imageUrls: string[];
}

const EditNoteModal: React.FC<IEditNoteModalProps> = ({
  onClose,
  noteId,
  title: initialTitle,
  content: initialContent,
  imageUrls: initialImageUrls,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [textContent, setTextContent] = useState(initialContent);
  const [imageUrls, setImageUrls] = useState<string[]>(initialImageUrls);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Autosave Hook - only starts saving when changes happen
  const { isSaving, cancelSave, setCurrentNoteId } = useAutosave({
    noteId,
    title,
    textContent,
    imageUrls,
  });

  useAutoResize(inputRef, textContent);

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

  const { closeModal, openModal, isOpen } = useModal();

  const handleOpenSummaryModal = () => {
    openModal(
      <SummaryModal
        onClose={closeModal}
        onAddSummary={(summary) => setTextContent((prev) => prev + summary)}
      />
    );
  };

  return (
    <Dialog
      onClose={onClose}
      className="relative flex flex-col border border-[#C085CA]/40 bg-secondary max-h-[80vh] dark:bg-dark-700 rounded-xl shadow-lg w-full max-w-3xl overflow-y-auto"
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
      <div className="flex bg-primary/10 justify-between items-center px-3 py-1">
        <Button
          variant="ghost"
          className="flex space-x-1 items-center cursor-pointer group"
          onClick={handleOpenSummaryModal}
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
    </Dialog>
  );
};

export default EditNoteModal;
