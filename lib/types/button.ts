import React from 'react';

export enum ButtonVariants {
  SOLID = 'solid',
  OUTLINE = 'outline',
  GHOST = 'ghost',
  ICON = 'icon',
}

export enum ButtonSizes {
  DEFAULT = 'default',
  SMALL = 'sm',
  LARGE = 'lg',
  ICON = 'icon',
}

export enum IconPosition {
  BEFORE = 'before',
  AFTER = 'after',
}

export type ButtonProps = {
  label?: string;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
