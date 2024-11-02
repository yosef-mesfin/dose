'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import Button from './ui/Button';
import { Icons } from './icons';
import { FaRegFileImage } from 'react-icons/fa';
import { TextArea } from './ui/textfield';
import { RiOpenaiFill } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import { SummaryModal } from './summary-modal';
import useAutosave from '@/lib/hooks/use-autosave';
import { MdOutlineClose } from 'react-icons/md';
import { deleteNote } from '@/app/(notes)/actions';
import { convertToBase64 } from '@/lib/utils';
import { LoadingSpinner } from './ui/loading-spinner';
import { useAutoResize } from '@/lib/hooks/use-autoresize';
import { ImagePreview } from './note-image-previews';

interface ICreateNoteProps {}

const CreateNote: React.FC<ICreateNoteProps> = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [textContent, setTextContent] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [noteId, setNoteId] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    if (!textContent.trim() && !title.trim()) {
      setIsFocused(false);
    }
  };

  const handleDiscard = useCallback(() => {
    if (noteId) {
      deleteNote(noteId);
    }
    handleClose();
  }, [noteId]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleClose = () => {
    setTitle('');
    setTextContent('');
    setImageUrls([]);
    setNoteId(null);
    setCurrentNoteId(null);
    setIsFocused(false);
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useAutoResize(inputRef, textContent);

  const handleAddSummary = (summary: string) => {
    setTextContent((prev) => prev + summary);
    handleCloseModal();
  };

  const { isSaving, currentNoteId, setCurrentNoteId, cancelSave } = useAutosave(
    {
      noteId,
      title,
      textContent,
      imageUrls,
    }
  );

  useEffect(() => {
    if (currentNoteId && currentNoteId !== noteId) {
      setNoteId(currentNoteId);
    }
  }, [currentNoteId]);

  useEffect(() => {
    if (!isFocused) {
      cancelSave();
    }
  }, [isFocused, cancelSave]);

  return (
    <div
      className={cn(
        'relative bg-secondary dark:bg-dark-700 border-[#ACB0B1] rounded-lg shadow-lg transition-all w-2/5 '
      )}
    >
      {!isFocused && (
        <div className="flex items-center p-2 gap-2 ">
          <Input
            type="text"
            placeholder="Take a note..."
            className="bg-transparent"
            onFocus={handleFocus}
          />
          <Button
            variant="icon"
            icon={
              <FaRegFileImage className="size-6 text-primary/50 hover:text-primary/90" />
            }
            onClick={() => setIsFocused(true)}
          />
        </div>
      )}
      {isFocused && (
        <div className="relative">
          {isSaving ? (
            <LoadingSpinner className="absolute top-2 right-3" />
          ) : (
            <Button
              variant="icon"
              icon={
                <MdOutlineClose className="size-7 text-primary/50 hover:text-primary/90" />
              }
              className="absolute top-0 right-1"
              onClick={handleClose}
            />
          )}
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mb-2 mt-2 w-full font-semibold text-lg bg-transparent outline-none border-b"
            onFocus={handleFocus}
          />
          <ImagePreview imageUrls={imageUrls} removeImage={removeImage} />
          <TextArea
            ref={inputRef}
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            onBlur={handleBlur}
            placeholder="Take a note..."
            className="w-full bg-transparent min-h-12 border-none outline-none overflow-y-auto"
          />
          <div className="flex bg-primary/10 justify-between items-center mt-2 px-3 py-1">
            <Button
              variant="ghost"
              className="flex space-x-1 items-center cursor-pointer group"
              onClick={handleOpenModal}
            >
              <Icons
                icon={RiOpenaiFill}
                className="size-7 text-[#9834aa] group-hover:animate-pulse"
                onClick={handleOpenModal}
              />
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
                onClick={handleFileClick}
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
              <Button
                onClick={handleDiscard}
                variant="ghost"
                className="text-primary/80 hover:text-primary/100 mr-2"
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      )}
      <SummaryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddSummary={handleAddSummary}
      />
    </div>
  );
};

export { CreateNote };
