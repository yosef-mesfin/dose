import { SidebarDesktop } from '@/components/sidebar-desktop';
import { Search } from '@/components/search';
import { auth, signOut } from '@/lib/auth';
import { Session } from '@/lib/types/types';
import { redirect } from 'next/navigation';
import Button from '@/components/ui/Button';
import { ButtonSizes, ButtonVariants, IconPosition } from '@/lib/types/button';
import { AiOutlineLogout } from 'react-icons/ai';

interface INoteLayoutProps {
  children: React.ReactNode;
}

export default async function NoteLayout({ children }: INoteLayoutProps) {
  const session = (await auth()) as Session;

  if (!session) {
    redirect('/login');
  }

  return (
    <main className="relative flex w-full">
      <div className="flex flex-row w-full">
        <SidebarDesktop />
        <div className="flex-1 flex flex-col dark:bg-zinc-950">
          <div className="p-3 flex items-center justify-between">
            <Search />
            <form
              action={async () => {
                'use server';
                await signOut();
                redirect('/login');
              }}
            >
              <Button
                size={ButtonSizes.LARGE}
                iconPosition={IconPosition.AFTER}
                icon={<AiOutlineLogout className="size-8 text-destructive" />}
                label="Log Out"
                className="bg-primary/10 border hover:bg-primary/20"
              />
            </form>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
