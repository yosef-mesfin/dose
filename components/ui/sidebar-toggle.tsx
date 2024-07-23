'use client';

import { useSidebar } from '@/lib/hooks/use-sidebar';
import { Icons } from '../icons';

import React from 'react';
import Button from './Button';
import { ButtonVariants } from '@/types/button';
import { RxHamburgerMenu } from 'react-icons/rx';

export const SidebarToggle = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      className="-ml-4 flex items-center justify-center m-0"
      variant={ButtonVariants.ICON}
      onClick={() => toggleSidebar()}
    >
      <Icons icon={RxHamburgerMenu} className="size-6" />
    </Button>
  );
};
