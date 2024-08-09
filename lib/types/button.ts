/*eslint-disable */
export type ButtonVariants = 'solid' | 'outline' | 'ghost' | ('icon' & {});
export type ButtonSizes = 'default' | 'sm' | 'lg' | ('icon' & {});
export type IconPosition = 'before' | 'after';

export type ButtonProps = {
  label?: string;
  size?: ButtonSizes;
  variant?: ButtonVariants;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
