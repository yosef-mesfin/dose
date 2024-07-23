'use client';

import React from 'react';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { cn } from '@/lib/utils';

export interface SidebarProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-[100vh] flex-col dark:bg-zinc-950')}
    >
      {children}
    </div>
  );
};
