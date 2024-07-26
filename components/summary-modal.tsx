import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import Button from './ui/Button';
import { ButtonVariants } from '@/types/button';
import { RiOpenaiFill } from 'react-icons/ri';
import { Icons } from './icons';
import { IoMdSend } from 'react-icons/io';
import { IoMdAttach } from 'react-icons/io';
import { Summary } from './summary';

interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerate = () => {
    // Simulate generating a response
    setResponse('This is the generated summary response.');
  };

  const handleDiscard = () => {
    setResponse('');
    setPrompt('');
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="flex flex-col justify-center border border-[#C085CA] bg-secondary h-[80vh] dark:bg-dark-700 rounded-lg shadow-lg w-full max-w-3xl"
    >
      <div className="w-full px-2 pt-2">
        <Icons icon={RiOpenaiFill} className="size-8 text-[#9834aa]" />
      </div>
      <div className="flex flex-col flex-1 space-y-4">
        <div className="flex-grow rounded-lg flex items-start justify-center">
          {response ? (
            <div className="w-[90%] h-auto py-2 px-4">
              <Summary response={response} onDiscard={handleDiscard} />
            </div>
          ) : (
            <div className="h-[150px] w-[150px] p-2 flex self-center items-center text-center rounded-2xl dark:bg-zinc-950 border border-[#C086CA]">
              <p>
                Upload
                <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
                  .srt
                </code>{' '}
                or{' '}
                <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
                  .txt
                </code>{' '}
                file to generate a summar
              </p>
            </div>
          )}
        </div>
        <div className="flex items-center w-full space-x-2 bg-primary/10 px-4 h-14 rounded-lg">
          <Button
            variant={ButtonVariants.ICON}
            icon={<IoMdAttach className="ml-3 size-7 text-primary/60" />}
          />
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt..."
            className="flex-grow outline-none border-none h-12"
          />
          <Button
            variant={ButtonVariants.ICON}
            onClick={handleGenerate}
            className="pr-4"
            icon={<IoMdSend className="size-7 text-[#9834AA]" />}
          />
        </div>
      </div>
    </Dialog>
  );
};

export { SummaryModal };
