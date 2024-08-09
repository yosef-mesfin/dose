import {
  ButtonProps,
  ButtonSizes,
  ButtonVariants,
} from '../../lib/types/button';
import { cn } from '@/lib/utils';

const Button: React.FC<ButtonProps> = ({
  label,
  variant = 'solid',
  size = 'default',
  icon,
  iconPosition,
  onClick,
  disabled,
  className,
  children,
  ...props
}) => {
  const baseStyles = 'flex items-center p-1 rounded-md';
  const variantStyles: Record<ButtonVariants, string> = {
    solid: 'bg-primary text-white hover:bg-blue-600 focus:ring-blue-500',
    outline: 'border border-blue-500',
    ghost: 'text-primary',
    icon: 'relative bg-transparent flex item-center justify-center',
  };

  const sizeStyles: Record<ButtonSizes, string> = {
    default: 'h-10 py-2 text-base',
    sm: 'h-8 px-3 py-1 text-sm',
    lg: 'h-12 px-5 py-3 text-lg',
    icon: 'h-8 w-8',
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
      {icon && iconPosition === 'before' && (
        <span className={cn(label && 'mr-2')} data-testid="icon">
          {icon}
        </span>
      )}
      {variant !== 'icon' ? label || children : icon}
      {icon && iconPosition === 'after' && (
        <span className={cn(label && 'ml-2')} data-testid="icon">
          {icon}
        </span>
      )}
    </button>
  );
};

export default Button;
