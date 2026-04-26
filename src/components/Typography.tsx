import React from 'react';

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'caption';

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement | HTMLSpanElement> {
  variant: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({ 
  variant, 
  children, 
  className = '', 
  as,
  ...props 
}) => {
  const baseStyles = 'text-mixue-dark';
  
  const variantStyles: Record<TypographyVariant, string> = {
    h1: 'text-2xl font-bold',
    h2: 'text-lg font-semibold',
    h3: 'text-base font-medium',
    body1: 'text-sm font-normal',
    caption: 'text-xs font-normal text-mixue-gray',
  };

  const Component = as || (
    variant === 'h1' ? 'h1' : 
    variant === 'h2' ? 'h2' : 
    variant === 'h3' ? 'h3' : 
    variant === 'caption' ? 'span' : 'p'
  );

  return (
    <Component 
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
