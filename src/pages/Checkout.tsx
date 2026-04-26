import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { getTotal } = useCartStore();
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2">Checkout</Typography>
        <div className="w-6"></div> {/* Spacer for centering */}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
        {/* Delivery Method */}
        <div>
          <Typography variant="h3" className="mb-3 text-sm text-mixue-gray">Delivery Method</Typography>
          <div className="flex space-x-3">
            <button 
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${deliveryMethod === 'delivery' ? 'border-mixue-red bg-red-50 text-mixue-red' : 'border-gray-200 bg-white text-mixue-dark'}`}
              onClick={() => setDeliveryMethod('delivery')}
            >
              <div className="flex items-center mb-1">
                {deliveryMethod === 'delivery' ? <CheckCircle2 size={16} className="mr-1" /> : <Circle size={16} className="mr-1 text-gray-300" />}
                <span className="font-semibold text-sm">Delivery</span>
              </div>
              <span className="text-[10px] opacity-80">30-40 mins</span>
            </button>
            <button 
              className={`flex-1 flex flex-col items-center justify-center py-3 rounded-2xl border ${deliveryMethod === 'pickup' ? 'border-mixue-red bg-red-50 text-mixue-red' : 'border-gray-200 bg-white text-mixue-dark'}`}
              onClick={() => setDeliveryMethod('pickup')}
            >
              <div className="flex items-center mb-1">
                {deliveryMethod === 'pickup' ? <CheckCircle2 size={16} className="mr-1" /> : <Circle size={16} className="mr-1 text-gray-300" />}
                <span className="font-semibold text-sm">Pickup</span>
              </div>
              <span className="text-[10px] opacity-80">Take away</span>
            </button>
          </div>
        </div>

        {/* Delivery Address */}
        <div>
          <Typography variant="h3" className="mb-3 text-sm text-mixue-gray">Delivery Address</Typography>
          <div className="bg-white rounded-2xl p-4 shadow-card flex items-start">
            <MapPin size={20} className="text-mixue-red mr-3 mt-0.5 shrink-0" />
            <div className="flex-1">
              <Typography variant="body1" className="font-semibold text-sm mb-1">Home</Typography>
              <Typography variant="caption" className="text-mixue-gray">Jl. Merdeka No. 10, Jakarta</Typography>
            </div>
            <button className="text-mixue-red text-xs font-semibold shrink-0 ml-2">Change</button>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <Typography variant="h3" className="mb-3 text-sm text-mixue-gray">Payment Method</Typography>
          <div 
            className="bg-white rounded-2xl p-4 shadow-card flex items-center cursor-pointer"
            onClick={() => navigate('/payment')}
          >
            <CreditCard size={20} className="text-mixue-dark mr-3 shrink-0" />
            <Typography variant="body1" className="font-semibold text-sm flex-1">Select Payment Method</Typography>
            <ChevronRight size={20} className="text-gray-400 shrink-0" />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-bottom-nav z-20 pb-safe flex items-center justify-between">
        <div>
          <Typography variant="caption" className="text-mixue-gray block">Total Payment</Typography>
          <Typography variant="h2" className="text-mixue-red">Rp {getTotal().toLocaleString('id-ID')}</Typography>
        </div>
        <Button size="lg" className="w-32" onClick={() => navigate('/payment')}>
          Continue
        </Button>
      </div>
    </div>
  );
};
