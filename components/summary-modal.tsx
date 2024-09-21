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
interface SummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sampleSummary = `This is a sample summary response. It is generated using the OpenAI
 API. The response is generated based on the input prompt provided by the user. The response
  is generated using the GPT-3 model, which is a state-of-the-art language model developed by
   OpenAI. The response is generated based on the input prompt provided by the user. The response
    is generated using the GPT-3 model, which is a state-of-the-art language model developed by OpenAI.
    \n
  This is a sample summary response. It is generated using the OpenAI API. The response is generated based on the input prompt provided by the user. The response
  is generated using the GPT-3 model, which is a state-of-the-art language model developed by
   OpenAI. The response is generated based on the input prompt provided by the user. The response
    is generated using the GPT-3 model, which is a state-of-the-art language model developed by OpenAI.
    `;

const SummaryModal: React.FC<SummaryModalProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [focus, setFocus] = useState(false);
  const [filename, setFilename] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setResponse(sampleSummary);
    }, 10000);
  };

  const handleDiscard = () => {
    setResponse('');
    setPrompt('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFilename('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFilename(file.name);
      setResponse('');
    }
  };

  const handleFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
            {(filename || prompt) && (
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
            {!prompt && filename && (
              <ShinyButton onClick={handleGenerate}>summarize</ShinyButton>
            )}
          </div>
        </div>
        <div className="flex-grow rounded-lg flex items-start justify-center">
          {loading && (
            <div className="m-auto text-[#9843AA] animate-spin">
              <Button
                variant="icon"
                icon={<RiOpenaiFill className="size-12" />}
              />
            </div>
          )}
          {response ? (
            <div className="w-[90%] h-auto py-2 px-4">
              <Summary response={response} onDiscard={handleDiscard} />
            </div>
          ) : (
            !filename && <SummaryWelcome />
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
