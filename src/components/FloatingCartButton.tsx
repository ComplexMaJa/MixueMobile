import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { FiShoppingCart } from 'react-icons/fi';

export const FloatingCartButton: React.FC = () => {
  const navigate = useNavigate();
  const { items, getSubtotal } = useCartStore();
  
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = getSubtotal();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-[84px] left-0 right-0 px-6 z-30 flex justify-center pointer-events-none animate-fade-in">
      <button 
        onClick={() => navigate('/cart')}
        className="bg-mixue-red rounded-[36px] w-full max-w-[320px] px-8 py-3.5 flex justify-between items-center shadow-[0_8px_20px_rgba(228,0,43,0.3)] pointer-events-auto transform transition-transform active:scale-95"
      >
        <div className="flex flex-col text-left">
          <span className="text-white font-bold text-[22px] leading-tight mb-0.5">{totalItems} Item{totalItems > 1 ? 's' : ''}</span>
          <span className="text-white font-medium text-[15px]">Rp {subtotal.toLocaleString('id-ID')}</span>
        </div>
        <FiShoppingCart size={32} className="text-black" strokeWidth={2} />
      </button>
    </div>
  );
};
