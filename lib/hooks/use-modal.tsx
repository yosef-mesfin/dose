import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';

import { createPortal } from 'react-dom';

interface IModal {
  content: ReactNode;
}

interface IModalContextProps {
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
  isOpen: boolean;
}

const ModalContext = createContext<IModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modalStack, setModalStack] = useState<IModal[]>([]);

  // Open modal
  const openModal = useCallback((content: ReactNode) => {
    setModalStack((prev) => [...prev, { content }]);
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setModalStack((prev) => prev.slice(0, -1));
  }, []);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setModalStack([]);
  }, []);

  //Handle Esc to close the topmost modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modalStack.length > 0) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [modalStack, closeModal]);

  const isOpen = modalStack.length > 0;
  const activeModal = modalStack.at(-1)?.content;

  return (
    <ModalContext.Provider value={{ closeModal, openModal, isOpen }}>
      {children}
      {activeModal &&
        createPortal(
          <div
            className="fixed inset-0 z-50 bg-black/30 flex justify-center items-center"
            // onClick={closeModal} // Close on outside click
          >
            <div
              className="relative bg-white dark:bg-gray-800 p-4 rounded shadow-lg"
              onClick={(e) => e.stopPropagation()} // Prevent bubbling
            >
              {activeModal}
            </div>
            <div
              className="absolute inset-0"
              onClick={closeModal} // Clicking outside the modal closes it
            />
          </div>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModal = (): IModalContextProps => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};
