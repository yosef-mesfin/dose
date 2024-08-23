'use client';

import React from 'react';

import { SidebarProvider } from '@/lib/hooks/use-sidebar';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>{children}</SidebarProvider>
      </QueryClientProvider>
    </NextThemeProvider>
  );
};
