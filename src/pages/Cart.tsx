import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Edit3 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getSubtotal, getDeliveryFee, getTotal } = useCartStore();

  const handleCheckout = () => {
    if (items.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2">My Cart</Typography>
        <button className="text-mixue-red text-sm font-semibold p-1">Edit</button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <span className="text-6xl mb-4">🛒</span>
            <Typography variant="h2" className="mb-2">Your cart is empty</Typography>
            <Typography variant="body1" className="text-mixue-gray mb-6">Looks like you haven't added any items yet.</Typography>
            <Button onClick={() => navigate('/menu')}>Browse Menu</Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="p-4 space-y-4">
              {items.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-4 shadow-card flex gap-3">
                  <div className="w-16 h-20 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                    <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <Typography variant="body1" className="font-semibold text-sm truncate pr-2">
                        {item.productName}
                      </Typography>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-mixue-red">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <Typography variant="caption" className="text-[10px] mb-2 line-clamp-1">
                      {Object.values(item.selectedVariants).map(v => v.name).join(', ')}
                    </Typography>
                    
                    <div className="flex justify-between items-end mt-auto">
                      <div className="flex items-center border border-gray-200 rounded-full h-7 w-20">
                        <button 
                          className="w-7 h-full flex items-center justify-center text-mixue-dark text-xs"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >-</button>
                        <div className="flex-1 text-center font-semibold text-mixue-dark text-xs">{item.quantity}</div>
                        <button 
                          className="w-7 h-full flex items-center justify-center text-mixue-red text-xs"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <Typography variant="body1" className="font-bold text-sm">
                        Rp {item.totalItemPrice.toLocaleString('id-ID')}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Note Input */}
            <div className="px-4 mb-4">
              <div className="bg-white rounded-2xl p-4 shadow-card flex items-center">
                <Edit3 size={16} className="text-mixue-gray mr-3" />
                <input 
                  type="text" 
                  placeholder="Add Note" 
                  className="flex-1 text-sm focus:outline-none text-mixue-dark placeholder:text-mixue-gray"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="px-4 mb-6">
              <div className="bg-white rounded-2xl p-4 shadow-card">
                <Typography variant="h3" className="mb-4 text-sm">Order Summary</Typography>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <Typography variant="body1" className="text-mixue-gray text-xs">Subtotal</Typography>
                    <Typography variant="body1" className="font-medium text-xs">Rp {getSubtotal().toLocaleString('id-ID')}</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography variant="body1" className="text-mixue-gray text-xs">Delivery Fee</Typography>
                    <Typography variant="body1" className="font-medium text-xs">Rp {getDeliveryFee().toLocaleString('id-ID')}</Typography>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                  <Typography variant="body1" className="font-bold text-sm">Total</Typography>
                  <Typography variant="h2" className="text-mixue-red text-base">Rp {getTotal().toLocaleString('id-ID')}</Typography>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Sticky Bottom Action */}
      {items.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-bottom-nav z-20 pb-safe">
          <Button fullWidth size="lg" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};
