'use client';
import { useRef } from 'react';
import SignupForm from '@/components/signup-form';
import { WelcomeSection } from '@/components/welcome-section';
import Button from '@/components/ui/Button';
import { ButtonSizes, IconPosition } from '@/lib/types/button';
import { FcGoogle } from 'react-icons/fc';
import Link from 'next/link';

export default function Landing() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex flex-col w-full h-screen overflow-scroll"
    >
      <WelcomeSection conainerRef={containerRef} />

      <div className="relative z-10 w-full overflow-x-clip">
        <div className="flex flex-col min-h-screen items-center justify-center p-8 ">
          <h2 className="text-foreground text-2xl md:text-4xl font-bold mb-5">
            Login or Sign Up
          </h2>

          <div className="h-[400px] w-[400px]">
            <SignupForm />
          </div>
          <div className="flex items-center justify-center gap-3 mt-6 w-[400px]">
            <div className="w-1/3 border-b border-text"></div>
            <p className="text-lg font-semibold">or</p>
            <div className="w-1/3 border-b border-text"></div>
          </div>
          <div className="mt-6 w-[335px] flex justify-center">
            <Link href="/notes" className="w-full" prefetch>
              <Button
                size={ButtonSizes.LARGE}
                iconPosition={IconPosition.BEFORE}
                icon={<FcGoogle className="size-10" />}
                label="Continue with Google"
                className="bg-primary/10 border w-full hover:bg-primary/20"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
