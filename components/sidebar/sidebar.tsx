'use client';

import React from 'react';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { cn } from '@/lib/utils';
import { LoadingSpinner } from '../ui/loading-spinner';

export interface SidebarProps extends React.ComponentProps<'div'> {
  children: React.ReactNode;
}

const Loading = () => {
  return (
    <div
      data-testid="loading"
      className="flex justify-center items-center h-full"
    >
      <LoadingSpinner />
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ children, className }) => {
  const { isSidebarOpen, isLoading } = useSidebar();

  return (
    <div
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950')}
    >
      {isLoading ? <Loading data-testid="loading" /> : children}
    </div>
  );
};
