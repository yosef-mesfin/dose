import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';
import { cn } from '@/lib/utils';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Toaster } from '@/components/ui/Toaster';

export const metadata: Metadata = {
  title: 'Dose',
  description: 'Dose, AI powered minimal note taking application',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
        <Toaster position="top-center" />
        <Providers
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative h-screen flex">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
