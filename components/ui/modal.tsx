import { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  children: ReactNode;
  onClose: () => void;
}

const Modal: React.FC<IModalProps> = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return createPortal(
    <div
      className="relative bg-white dark:bg-gray-800 p-4 rounded shadow-lg"
      ref={modalRef}
    >
      {children}
    </div>,
    document.body
  );
};

export default Modal;
