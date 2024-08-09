import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ShinyButton from './ui/ShinyButton';
import { IoPencil } from 'react-icons/io5';
import Link from 'next/link';
import Button from './ui/Button';
import { RiOpenaiFill } from 'react-icons/ri';
import { GrNotes } from 'react-icons/gr';
import { FaRegFileImage } from 'react-icons/fa';
import Image from 'next/image';

interface IWelcomeSectionProps {
  conainerRef: React.RefObject<HTMLDivElement>;
}

export const WelcomeSection: React.FC<IWelcomeSectionProps> = ({
  conainerRef,
}) => {
  const welcomeSectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: conainerRef,
    target: welcomeSectionRef,
    offset: ['end end', 'end start'],
  });

  const welcomeOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 0.5, 0]
  );

  return (
    <motion.section
      ref={welcomeSectionRef}
      style={{ opacity: welcomeOpacity }}
      className="relative mt-[10rem] min-h-screen flex justify-center"
    >
      <div className="fixed flex flex-col gap-10">
        <div className="flex flex-col items-center bg-primary/10 p-8 m-auto">
          <div className="flex items-center justify-center">
            <h1
              className="flex items-center text-foreground text-3xl md:text-5xl font-bold
            bg-gradient-to-r"
            >
              Welcome to
              <span className="ml-1 bg-zinc-950 p-2 rounded-lg flex text-[#C085CA]">
                Dose.
                <IoPencil className="text-[#bd9924]" />
              </span>
            </h1>
          </div>
          <p className="text-foreground/80 text-md md:text-lg mt-4 text-center">
            Distraction-free note-taking app powered by AI for smart and
            productive note-taking.
          </p>
          <Link href="/signup">
            <ShinyButton style={{ marginTop: '1rem' }}>Get Started</ShinyButton>
          </Link>
        </div>

        <div className="flex items-end gap-3">
          <div className="card-wrapper h-[260px] w-[230px] ">
            <div
              className="card-content flex items-center justify-center text-center p-2"
              style={{
                height: 'calc(100% - 4px)',
                width: 'calc(100% - 4px)',
                top: '2px',
                left: '2px',
              }}
            >
              <Button
                variant="icon"
                icon={<RiOpenaiFill className="size-10" />}
                className="absolute top-1 right-1 text-[#9843AA] animate-spin mt-1 duration-3000"
              />
              <p>
                upload{' '}
                <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
                  .srt
                </code>{' '}
                or{' '}
                <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
                  .txt
                </code>{' '}
                file to generate a summary
              </p>
            </div>
          </div>

          <div className="card-wrapper h-[260px] w-[230px] m-auto ">
            <div
              className="card-content relative flex items-center justify-center text-center p-2"
              style={{
                height: 'calc(100% - 4px)',
                width: 'calc(100% - 4px)',
                top: '2px',
                left: '2px',
              }}
            >
              <Button
                variant="icon"
                icon={<GrNotes className="size-9" />}
                className="absolute top-1 right-1 text-[#bd9924] animate-pulse mt-1 duration-3000"
              />
              <div className="self-center flex flex-col gap-5">
                <p>Take quick notes </p>
                <div className="self-center flex flex-wrap justify-center gap-2">
                  <code className="px-2 bg-yellow-100 dark:bg-yellow-800 rounded">
                    update
                  </code>
                  <code className="px-2 bg-gray-100 dark:bg-[#9843AA] rounded">
                    tag
                  </code>
                  <code className="px-2 bg-primary/30 dark:bg-primary-30 rounded">
                    search
                  </code>
                  <code className="px-2 bg-gray-100 dark:bg-gray-800 rounded">
                    archive
                  </code>
                  <code className="px-2 bg-gray-100 dark:bg-destructive rounded">
                    delete
                  </code>{' '}
                </div>
              </div>
            </div>
          </div>

          <div className="card-wrapper h-[260px] w-[230px] ">
            <div
              className="card-content flex flex-col justify-center items-center text-center p-2 gap-2"
              style={{
                height: 'calc(100% - 4px)',
                width: 'calc(100% - 4px)',
                top: '2px',
                left: '2px',
              }}
            >
              <Image
                src="/images/sample_image.jpg"
                alt="notes"
                width={200}
                height={50}
                className="w-[100%] rounded-lg h-[100px] object-cover mt-5"
              />
              <p className="text-sm">
                Take notes with related images for better organization ...
              </p>
              <Button
                variant="icon"
                icon={<FaRegFileImage className="size-9" />}
                className="absolute top-1 right-1 text-primary/60 mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
