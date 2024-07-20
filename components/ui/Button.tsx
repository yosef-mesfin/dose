// components/Button.tsx
import React from 'react';
import clsx from 'clsx';
import {
  ButtonVariants,
  ButtonProps,
  ButtonSizes,
  IconPosition,
} from '../../types/button';

const Button: React.FC<ButtonProps> = ({
  label,
  variant = ButtonVariants.SOLID,
  size = ButtonSizes.DEFAULT,
  icon,
  iconPosition = 'before',
  onClick,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles =
    'px-4 flex items-center py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    [ButtonVariants.SOLID]:
      'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    [ButtonVariants.OUTLINE]:
      'border border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
    [ButtonVariants.GHOST]:
      'text-blue-500 hover:bg-blue-50 focus:ring-blue-500',
    [ButtonVariants.ICON]:
      'rounded-full bg-transparent flex item-center justify-center text-white border border-pink-500 hover:bg-pink-500',
  };

  const sizeStyles = {
    [ButtonSizes.DEFAULT]: 'h-10 px-4 py-2 text-base',
    [ButtonSizes.SMALL]: 'h-8 px-3 py-1 text-sm',
    [ButtonSizes.LARGE]: 'h-12 px-5 py-3 text-lg',
    [ButtonSizes.ICON]: 'h-10 w-10',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        disabled && disabledStyles,
        className
      )}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && iconPosition === IconPosition.BEFORE && (
        <span className={clsx(label && 'mr-2')} data-testid="icon">
          {icon}
        </span>
      )}
      {label || children}
      {icon && iconPosition === IconPosition.AFTER && (
        <span className={clsx(label && 'ml-2')} data-testid="icon">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
