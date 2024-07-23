'use client';

import React from 'react';

import { SidebarProvider } from '@/lib/hooks/use-sidebar';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

export const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider {...props}>
      <SidebarProvider>{children}</SidebarProvider>
    </NextThemeProvider>
  );
};
