import React from 'react';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export const Chip: React.FC<ChipProps> = ({ 
  active = false, 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap';
  const activeStyles = active 
    ? 'bg-mixue-red text-white border border-mixue-red' 
    : 'bg-white text-mixue-dark border border-gray-200 hover:bg-gray-50';

  return (
    <button 
      className={`${baseStyles} ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
