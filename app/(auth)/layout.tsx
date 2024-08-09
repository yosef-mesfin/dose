import Button from '@/components/ui/Button';
import { FcGoogle } from 'react-icons/fc';
import { auth, signIn } from '@/lib/auth';
import { Session } from '@/lib/types/types';
import { redirect } from 'next/navigation';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await auth()) as Session;
  if (session) {
    redirect('/notes');
  }

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="flex flex-col items-center justify-center p-8 ">
          <h2 className="text-foreground text-2xl md:text-4xl font-bold mb-5">
            Login or Sign Up
          </h2>
          {children}
          <div className="flex items-center justify-center gap-3 mt-6 w-[400px]">
            <div className="w-1/3 border-b border-text"></div>
            <p className="text-lg font-semibold">or</p>
            <div className="w-1/3 border-b border-text"></div>
          </div>
          <div className="mt-6 w-[335px] flex justify-center">
            <form
              action={async () => {
                'use server';
                await signIn('google');
                redirect('/notes');
              }}
            >
              <Button
                size="lg"
                iconPosition="before"
                icon={<FcGoogle className="size-10" />}
                label="Continue with Google"
                className="bg-primary/10 border w-full hover:bg-primary/20"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="overflow-hidden bg-animation -z-[10] opacity-80">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        <div id="stars4"></div>
      </div>
    </main>
  );
}
