import React from 'react';
import Button from '../ui/Button';
import { AiOutlineClose } from 'react-icons/ai';
import { IoMdRefresh } from 'react-icons/io';
import { FaPlus } from 'react-icons/fa6';

interface SummaryProps {
  response: string;
  onDiscard: () => void;
  onAdd: () => void;
  onRefresh: () => void;
}

const Summary: React.FC<SummaryProps> = ({
  response,
  onDiscard,
  onAdd,
  onRefresh,
}) => {
  return (
    <div className="">
      <div className="relative shadow-md h-auto rounded-lg bg-black p-4 overflow-y-auto">
        <div className="prose text-primary/90 dark:prose-dark w-full">
          {response || 'No Summary Available'}
        </div>
      </div>
      <div className="flex justify-end space-x-2 mt-1">
        <Button
          variant="icon"
          onClick={onDiscard}
          className="text-red-500/80 hover:text-red-700/80"
          icon={<AiOutlineClose className="size-6" />}
        />
        <Button
          variant="icon"
          className="text-primary/80"
          onClick={onRefresh}
          icon={<IoMdRefresh className="size-6" />}
        />
        <Button
          variant="icon"
          className="text-green-500/80 hover:text-green-700/80"
          onClick={onAdd}
          icon={<FaPlus className="size-6" />}
          disabled={!response}
        />
      </div>
    </div>
  );
};

export { Summary };
