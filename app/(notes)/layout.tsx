import { SidebarDesktop } from '@/components/sidebar-desktop';
import { Search } from '@/components/search';
import { auth } from '@/lib/auth';
import { Session } from '@/lib/types/types';
import { redirect } from 'next/navigation';

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
          <div className="p-3 flex items-center justify-between">
            <Search />
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
