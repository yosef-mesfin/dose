import { SidebarDesktop } from '@/components/sidebar-desktop';
import { Search } from '@/components/search';
import { auth, signOut } from '@/lib/auth';
import { Session } from '@/lib/types/types';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import { AiOutlineLogout } from 'react-icons/ai';
import { Suspense } from 'react';
import NotesSkeleton from '@/components/notes-skeleton';

interface INoteLayoutProps {
  children: React.ReactNode;
}

export default async function NoteLayout({ children }: INoteLayoutProps) {
  const session = (await auth()) as Session;

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="relative flex w-full">
      <div className="flex flex-row w-full">
        <SidebarDesktop />
        <div className="flex-1 flex flex-col dark:bg-zinc-950">
          <div className="py-3 px-2 flex items-center justify-between">
            <Search />
            <form
              action={async () => {
                'use server';
                await signOut();
                redirect('/login');
              }}
              className="mr-3"
            >
              <Button
                size="lg"
                iconPosition="after"
                icon={<AiOutlineLogout className="size-8 text-destructive" />}
                label="Log Out"
                className="bg-primary/10 border hover:bg-primary/20"
              />
            </form>
          </div>
          <Suspense fallback={<NotesSkeleton />}>{children}</Suspense>
        </div>
      </div>
    </main>
  );
}
