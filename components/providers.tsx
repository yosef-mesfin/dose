'use client';

import React from 'react';

import { SidebarProvider } from '@/lib/hooks/use-sidebar';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';
import { ModalProvider } from '@/lib/hooks/use-modal';

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
      <SidebarProvider>
        <ModalProvider>{children}</ModalProvider>
      </SidebarProvider>
    </NextThemeProvider>
  );
};
