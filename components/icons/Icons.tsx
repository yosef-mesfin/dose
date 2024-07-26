import React from 'react';
import { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

type IconProps = {
  icon: IconType;
  className?: string;
  name?: string;
  onClick?: () => void;
};

const Icons: React.FC<IconProps> = ({
  icon: Icon,
  className,
  name,
  onClick,
}) => {
  return (
    <div
      className="flex items-center justify-center w-10 h-10 hover:bg-primary/10 hover:rounded-full transition duration-200 ease-in-out"
      onClick={onClick}
    >
      <Icon className={cn(className)} name={name} />
    </div>
  );
};

export default Icons;
