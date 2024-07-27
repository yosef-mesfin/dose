'use client';
import React, { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import Button from './ui/Button';
import { ButtonVariants } from '@/lib/types/button';
import { Icons } from './icons';
import { FaRegFileImage } from 'react-icons/fa';
import { TextArea } from './ui/textfield';
import { RiOpenaiFill } from 'react-icons/ri';
import { AiOutlineMore } from 'react-icons/ai';
import { SummaryModal } from './summary-modal';

interface CreateNoteProps {}

const CreateNote: React.FC<CreateNoteProps> = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!text.trim() && !title.trim()) {
      setIsFocused(false);
    }
  };

  const handleDiscard = () => {
    setTitle('');
    setText('');
    setIsFocused(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, window.innerHeight * 0.7)}px`;
    }
  }, [text]);

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
            variant={ButtonVariants.ICON}
            icon={<FaRegFileImage className="size-6 text-primary/50" />}
          />
        </div>
      )}
      {isFocused && (
        <div className="">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="mb-2 mt-2 w-full font-semibold text-lg bg-transparent outline-none border-b"
            onFocus={handleFocus}
          />
          <TextArea
            ref={inputRef}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleBlur}
            placeholder="Take a note..."
            className="w-full bg-transparent min-h-12 border-none outline-none overflow-y-auto"
          />
          <div className="flex bg-primary/10 justify-between items-center mt-2 px-3 py-1">
            <div className="flex space-x-1 items-center">
              <Icons
                icon={RiOpenaiFill}
                className="size-7 text-[#9834aa]"
                onClick={handleOpenModal}
              />
              <span className="text-sm text-primary/50">Assistant</span>
            </div>
            <div className="flex flex-row">
              <Button
                variant={ButtonVariants.GHOST}
                className="text-primary/80 hover:text-primary/100"
              >
                <Icons
                  icon={FaRegFileImage}
                  className="size-5 text-primary/50"
                />
              </Button>
              <Button
                variant={ButtonVariants.ICON}
                className="text-primary/80 hover:text-primary/100"
              >
                <Icons icon={AiOutlineMore} className="size-7 text-primary" />
              </Button>
              <Button
                onClick={handleDiscard}
                variant={ButtonVariants.GHOST}
                className="text-primary/80 hover:text-primary/100 mr-2"
              >
                Discard
              </Button>
            </div>
          </div>
        </div>
      )}
      <SummaryModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export { CreateNote };
