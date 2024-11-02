import { useEffect, RefObject } from 'react';

export const useAutoResize = (
  ref: RefObject<HTMLTextAreaElement>,
  text: string
) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, window.innerHeight * 0.4)}px`;
    }
  }, [text, ref]);
};
