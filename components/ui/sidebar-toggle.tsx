'use client';

import { useSidebar } from '@/lib/hooks/use-sidebar';
import { Icons } from '../icons';
import Button from './Button';
import { ButtonVariants } from '@/types/button';
import { RxHamburgerMenu } from 'react-icons/rx';

export const SidebarToggle = () => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();

  return (
    <Button
      className={`${isSidebarOpen ? 'ml-2' : 'ml-0'} flex items-center justify-center m-0`}
      variant={ButtonVariants.ICON}
      onClick={() => toggleSidebar()}
    >
      <Icons icon={RxHamburgerMenu} className="size-6" />
    </Button>
  );
};
