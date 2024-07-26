import React from 'react';
import Button from './ui/Button';
import { ButtonVariants } from '@/types/button';
import { AiOutlineClose } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';
import { IoMdRefresh } from 'react-icons/io';

interface SummaryProps {
  response: string;
  onDiscard: () => void;
}

const Summary: React.FC<SummaryProps> = ({ response, onDiscard }) => {
  return (
    <div className="p-4">
      <div className="relative p-4 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md h-full overflow-y-auto">
        <div className="prose dark:prose-dark w-full">{response}</div>
      </div>
      <div className="flex justify-end space-x-3 mt-4">
        <Button
          variant={ButtonVariants.ICON}
          onClick={onDiscard}
          className="text-red-500 hover:text-red-700"
          icon={<AiOutlineClose />}
        />
        <Button
          variant={ButtonVariants.ICON}
          className="text-green-500 hover:text-green-700"
          icon={<FaPlus />}
        />
        <Button
          variant={ButtonVariants.ICON}
          className="text-yellow-500 hover:text-yellow-700"
          icon={<IoMdRefresh />}
        />
      </div>
    </div>
  );
};

export { Summary };
