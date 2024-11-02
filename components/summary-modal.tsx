import React, { useState } from 'react';
import { Dialog } from './ui/dialog';
import { Input } from './ui/input';
import Button from './ui/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import { Icons } from './icons';
import { IoMdSend } from 'react-icons/io';
import { IoMdAttach } from 'react-icons/io';
import { Summary } from './summary';
import Image from 'next/image';
import ShinyButton from './ui/ShinyButton';
import SummaryWelcome from './summary-welcome';
import { generateSummary } from '@/lib/summary/actions';
import { getMessageFromCode, preprocessFile } from '@/lib/utils';
import { ResultCode } from '@/lib/types/types';
interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSummary: (summary: string) => void;
}

const SummaryModal: React.FC<SummaryModalProps> = ({
  isOpen,
  onClose,
  onAddSummary,
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [focus, setFocus] = useState(false);
  const [filename, setFilename] = useState('');
  const [fileChunks, setFileChunks] = useState<string[] | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ResultCode | null>(null);

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFilename(file.name);
    setLoading(true);

    try {
      const chunks = await preprocessFile(file);
      setFileChunks(chunks);
      setResponse('');
    } catch (error) {
      console.error('Error Processing file: ', error);
      setResponse('Error Processing file');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!fileChunks) return;

    setLoading(true);

    try {
      const summary = await generateSummary(fileChunks);
      setResponse(summary);
    } catch (error) {
      console.error('Error Generating Summary: ', error);
      setError(ResultCode.SummaryFailed);
      setResponse('');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    setResponse('');
    setFilename('');
    setFileChunks(null);
    setPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  //Add note and close Modal
  const handleAdd = () => {
    if (response) onAddSummary(response);
    handleDiscard();
    onClose();
  };

  const handleRefresh = () => {
    setResponse('');
    handleGenerate();
  };

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      className="flex flex-col justify-center border border-[#C085CA]/40 bg-secondary h-[80vh] dark:bg-dark-700 rounded-xl shadow-lg w-full max-w-3xl"
    >
      <div className="w-full px-2 pt-2">
        <Icons
          icon={RiOpenaiFill}
          className={`size-8 text-[#9834aa] ${loading && 'animate-spin'}`}
        />
      </div>
      <div className="flex flex-col flex-1 space-y-4">
        <div className="m-1 flex flex-col gap-3 p-2 px-8">
          <div className="flex gap-4 items-center">
            {filename && (
              <Image
                src="/images/user.webp"
                alt="user"
                width={50}
                height={50}
                className="self-start rounded-full object-cover h-10 w-10"
              />
            )}
            <div className="flex p-2 flex-1 justify-center flex-col gap-2">
              {prompt && <h4 className="text-primary/80 text-md">{prompt}</h4>}
              {filename && (
                <div className="px-4 flex items-center text-primary/50 italic">
                  {filename}
                </div>
              )}
            </div>
            {filename && (
              <ShinyButton onClick={handleGenerate}>summarize</ShinyButton>
            )}
          </div>
        </div>
        <div className="flex-grow rounded-lg flex items-start justify-center">
          {loading ? (
            <div className="m-auto text-[#9843AA] animate-spin">
              <Button
                variant="icon"
                icon={<RiOpenaiFill className="size-12" />}
              />
            </div>
          ) : response ? (
            <div className="w-[90%] h-auto py-2 px-4">
              <Summary
                response={response}
                onDiscard={handleDiscard}
                onAdd={handleAdd}
                onRefresh={handleRefresh}
              />
            </div>
          ) : error ? (
            <p className="text-red-500 text-center">
              {getMessageFromCode(error)}
            </p>
          ) : (
            <SummaryWelcome />
          )}
        </div>
        <div className="flex items-center w-full space-x-2 bg-primary/10 px-4 h-14 rounded-b-xl">
          <Button
            variant="icon"
            icon={
              <IoMdAttach className="ml-3 size-7 text-primary/50 hover:text-primary/80" />
            }
            onClick={handleFileClick}
          />
          <Input
            accept=".srt,.txt"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <Input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setFocus(true)}
            placeholder="Enter your prompt..."
            className="flex-grow outline-none border-none h-12"
          />
          <Button
            variant="icon"
            onClick={handleGenerate}
            className="pr-4"
            icon={
              <IoMdSend
                className={`size-7  ${focus ? 'text-[#9834AA]' : 'text-[#9834AA]/40'}`}
              />
            }
          />
        </div>
      </div>
    </Dialog>
  );
};

export { SummaryModal };
