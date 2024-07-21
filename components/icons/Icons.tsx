import React from 'react';
import { IconType } from 'react-icons';

type IconProps = {
  icon: IconType;
  className?: string;
  name: string;
};

const Icons: React.FC<IconProps> = ({ icon: Icon, className, name }) => {
  return <Icon className={className} name={name} />;
};

export default Icons;
