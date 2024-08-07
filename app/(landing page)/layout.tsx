import { auth } from '@/lib/auth';
import { Session } from '@/lib/types/types';
import { redirect } from 'next/navigation';

export default async function LandingLayout({
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
        {children}
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
