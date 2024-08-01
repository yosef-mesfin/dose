import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...classes: ClassValue[]) => {
  return twMerge(clsx(classes));
};

export const generateStarPositions = (count: number, color: string) => {
  const positions = [];

  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000);
    const y = Math.floor(Math.random() * 2000);

    positions.push(`${x}px ${y}px ${color}`);
  }
  return positions.join(', ');
};

export const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};
