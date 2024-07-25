'use client';
import { CreateNote } from '@/components/create-note';
import { Search } from '@/components/search';
import { SidebarDesktop } from '@/components/sidebar-desktop';
import { useSidebar } from '@/lib/hooks/use-sidebar';

export default function Home() {
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
          <div className="flex-1 flex flex-col overflow-y-scroll p-2">
            <div className="h-auto mt-3 p-2 flex items-center justify-center">
              <CreateNote />
            </div>
            <div className="bg-gray-500 flex-1">Notes</div>
          </div>
        </div>
      </div>
    </main>
  );
}
