import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const textSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-2xl',
  };

  return (
    <span
      className={`font-semibold tracking-tight text-white lowercase select-none ${textSizes[size]} ${className}`}
    >
      obsess
    </span>
  );
};
