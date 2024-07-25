'use client';

import { Sidebar } from './sidebar';
import { SidebarItem } from './sidebar-item';
import { GrNotes } from 'react-icons/gr';
import {
  MdOutlineArchive,
  MdOutlineSettings,
  MdAccountCircle,
} from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { SidebarToggle } from './ui/sidebar-toggle';

const menus = [
  { name: 'Notes', icon: GrNotes, href: '/' },
  { name: 'Archive', icon: MdOutlineArchive, href: '/archive' },
  { name: 'Trash', icon: FaRegTrashAlt, href: '/trash' },
];

const footerMenus = [
  { name: 'Account', icon: MdAccountCircle, href: '/account' },
  { name: 'Settings', icon: MdOutlineSettings, href: '/settings' },
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
      <div className="h-full flex flex-col justify-between">
        <div>
          <div className="h-16 border-b gap-4 flex flex-row items-center">
            <SidebarToggle />
            {isSidebarOpen && <h1 className="text-2xl italic">Dose</h1>}
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
        <div className="flex flex-col gap-2 mt-4">
          {footerMenus.map((menu) => (
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
