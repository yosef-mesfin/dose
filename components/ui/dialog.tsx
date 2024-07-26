import React from 'react';
import { cn } from '@/lib/utils';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-20 w-11/12 max-w-3xl rounded-lg shadow-lg',
          'transition-all transform',
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          className
        )}
      >
        {children}
        <button
          className="absolute top-3 right-3 text-primary dark:text-primary/50 hover:text-primary/90"
          onClick={onClose}
        >
          close
        </button>
      </div>
    </div>
  );
};

export { Dialog };
