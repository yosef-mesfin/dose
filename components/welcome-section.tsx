import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import ShinyButton from './ui/ShinyButton';
import { IoPencil } from 'react-icons/io5';

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

  const welcomeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleGetStarted = () => {
    conainerRef.current?.scrollTo({
      top: conainerRef.current.clientHeight,
      behavior: 'smooth',
    });
  };

  return (
    <motion.section
      ref={welcomeSectionRef}
      style={{ opacity: welcomeOpacity }}
      className="relative mt-[10rem] min-h-screen flex justify-center"
    >
      <div className="fixed flex flex-col items-center bg-primary/10 p-8 m-auto">
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
        <ShinyButton style={{ marginTop: '1rem' }} onClick={handleGetStarted}>
          Get Started
        </ShinyButton>
      </div>
    </motion.section>
  );
};
