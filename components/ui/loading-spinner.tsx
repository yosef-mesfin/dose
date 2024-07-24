import { cn } from '@/lib/utils';

export const LoadingSpinner = ({
  className,
  ...props
}: React.ComponentProps<'svg'>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn(className, 'animate-spin h-5 w-5 text-white')}
      {...props}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        className="opacity-25"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 0112 4V0C6.477 0 2 4.477 2 10h4v7.291z"
        className="opacity-75"
      ></path>
    </svg>
  );
};
