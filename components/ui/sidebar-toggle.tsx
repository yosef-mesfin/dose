'use client';

import { useSidebar } from '@/lib/hooks/use-sidebar';
import Button from './Button';
import { ButtonVariants } from '@/lib/types/button';
import { RxHamburgerMenu } from 'react-icons/rx';

export const SidebarToggle = () => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  return (
    <Button
      className={`flex items-center h-12 w-12 ${!isSidebarOpen && 'h-11 w-11'} justify-center p-1 hover:bg-primary/10 hover:rounded-full transition duration-200 ease-in-out`}
      variant={ButtonVariants.ICON}
      onClick={() => toggleSidebar()}
      icon={<RxHamburgerMenu className="size-6" />}
    />
  );
};
