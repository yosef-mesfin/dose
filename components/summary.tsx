import React from 'react';
import Button from './ui/Button';
import { ButtonVariants } from '@/lib/types/button';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';

interface SummaryProps {
  response: string;
  onDiscard: () => void;
}

const Summary: React.FC<SummaryProps> = ({ response, onDiscard }) => {
  return (
    <div className="">
      <div className="relative shadow-md h-auto rounded-lg bg-black p-4 overflow-y-auto">
        <div className="prose text-primary/90 dark:prose-dark w-full">
          {response}
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-1">
        <Button
          variant={ButtonVariants.ICON}
          onClick={onDiscard}
          className="text-red-500/80 hover:text-red-700/80"
          icon={<AiOutlineClose className="size-6" />}
        />
        <Button
          variant={ButtonVariants.ICON}
          className="text-primary/80"
          icon={<IoMdRefresh className="size-6" />}
        />
        <Button
          variant={ButtonVariants.ICON}
          className="text-green-500/80 hover:text-green-700/80"
          icon={<FaPlus className="size-6" />}
        />
      </div>
    </div>
  );
};

export { Summary };
