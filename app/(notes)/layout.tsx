'use client';
import { SidebarDesktop } from '@/components/sidebar-desktop';
import { Search } from '@/components/search';
import { useSidebar } from '@/lib/hooks/use-sidebar';

interface INoteLayoutProps {
  children: React.ReactNode;
}

export default function NoteLayout({ children }: INoteLayoutProps) {
  const { isSidebarOpen } = useSidebar();
  return (
    <main className="relative flex w-full">
      <div className="flex flex-row w-full">
        <SidebarDesktop />
        <div className="flex-1 flex flex-col dark:bg-zinc-950">
          <div className="p-3 flex items-center justify-between">
            <Search />
            <div className="mr-4">
              {!isSidebarOpen && <h1 className="text-2xl italic">Dose</h1>}
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
