'use client';

import { Sidebar } from './sidebar';
import { SidebarItem } from './sidebar-item';
import { GrNotes } from 'react-icons/gr';
import { MdOutlineArchive } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { SidebarToggle } from '../ui/sidebar-toggle';
import Link from 'next/link';

const menus = [
  { name: 'Notes', icon: GrNotes, href: '/notes' },
  { name: 'Archive', icon: MdOutlineArchive, href: '/archive' },
  { name: 'Trash', icon: FaRegTrashAlt, href: '/trash' },
];

export const SidebarDesktop: React.FC = () => {
  const { isSidebarOpen } = useSidebar();

  return (
    <Sidebar
      data-testid="sidebar"
      className={`max-h-[100vh] border-r bg-muted duration-300 ease-in-out px-2 ${
        isSidebarOpen ? 'lg:w-[250px] xl:w-[300px]' : 'lg:w-[60px] xl:w-[60px]'
      } data-[state=open]:translate-x-0 lg:flex `}
    >
      <div className="h-full flex flex-col">
        <div
          className={`h-16 border-b gap-4 ${!isSidebarOpen && 'justify-center'} flex flex-row items-center`}
        >
          <SidebarToggle />
          {isSidebarOpen && (
            <Link href="/" prefetch={true}>
              <h1 className="text-2xl italic text-[#C085CA]">Dose</h1>
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2 mt-4">
          {menus.map((menu) => (
            <SidebarItem
              key={menu.href}
              name={menu.name}
              icon={menu.icon}
              href={menu.href}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </div>
      </div>
    </Sidebar>
  );
};
