import {
  ButtonVariants,
  ButtonProps,
  ButtonSizes,
  IconPosition,
} from '../../lib/types/button';
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  label,
  variant = ButtonVariants.SOLID,
  size = ButtonSizes.DEFAULT,
  icon,
  iconPosition,
  onClick,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'flex items-center p-1 rounded-md';
  const variantStyles = {
    [ButtonVariants.SOLID]:
      'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500',
    [ButtonVariants.OUTLINE]: 'border border-blue-500',
    [ButtonVariants.GHOST]: 'text-primary',
    [ButtonVariants.ICON]:
      'relative bg-transparent flex item-center justify-center',
  };

  const sizeStyles = {
    [ButtonSizes.DEFAULT]: 'h-10 py-2 text-base',
    [ButtonSizes.SMALL]: 'h-8 px-3 py-1 text-sm',
    [ButtonSizes.LARGE]: 'h-12 px-5 py-3 text-lg',
    [ButtonSizes.ICON]: 'h-8 w-8',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <button
      className={cn(
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
        <span className={cn(label && 'mr-2')} data-testid="icon">
          {icon}
        </span>
      )}
      {variant !== ButtonVariants.ICON ? label || children : icon}
      {icon && iconPosition === IconPosition.AFTER && (
        <span className={cn(label && 'ml-2')} data-testid="icon">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
