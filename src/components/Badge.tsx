import React from 'react';

type BadgeVariant = 'promo' | 'new' | 'best_seller';

interface BadgeProps {
  variant: BadgeVariant;
  children?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, children, className = '' }) => {
  const baseStyles = 'px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white';
  
  const variantStyles: Record<BadgeVariant, string> = {
    promo: 'bg-[#FF0000]',
    new: 'bg-[#00C853]',
    best_seller: 'bg-[#6200EA]',
  };

  const defaultText: Record<BadgeVariant, string> = {
    promo: 'PROMO',
    new: 'NEW',
    best_seller: 'BEST SELLER',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children || defaultText[variant]}
    </span>
  );
};
