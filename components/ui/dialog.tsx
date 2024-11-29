import React, { ReactNode, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface IDialogProps {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Dialog: React.FC<IDialogProps> = ({ onClose, children, className }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center">
      <div
        ref={dialogRef}
        className={cn(
          'relative z-20 bg-white dark:bg-gray-800 rounded-lg shadow-lg',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { Dialog };
