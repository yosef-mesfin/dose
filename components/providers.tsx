'use client';

import React from 'react';

import { SidebarProvider } from '@/lib/hooks/use-sidebar';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from '@/lib/hooks/use-modal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <ModalProvider>{children}</ModalProvider>
        </SidebarProvider>
      </QueryClientProvider>
    </NextThemeProvider>
  );
};
