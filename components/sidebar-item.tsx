'use client';
import { IconType } from 'react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icons from '@/components/icons/Icons';

type SidebarItemProps = {
  icon: IconType;
  name: string;
  href: string;
  isSidebarOpen?: boolean;
};

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon: Icon,
  name,
  href,
  isSidebarOpen,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-4 p-2 rounded-lg transition-colors duration-200 ease-in-out ${
        isActive
          ? 'bg-primary/10 text-primary/90'
          : 'text-primary/80 hover:bg-primary/10 hover:text-primary/80'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      <Icons
        icon={Icon}
        className={`${isSidebarOpen ? 'size-6' : 'size-7'} text-lg ${isActive ? 'text-primary/90' : 'text-primary/60'}`}
      />
      {isSidebarOpen && (
        <span className={isActive ? 'font-semibold' : ''}>{name}</span>
      )}
    </Link>
  );
};
