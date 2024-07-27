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
    <div className="flex items-center justify-center w-8 h-8" onClick={onClick}>
      <Icon className={cn(className, 'size-6')} name={name} />
    </div>
  );
};

export default Icons;
