import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Input } from '../components/Input';

export const Payment: React.FC = () => {
  const navigate = useNavigate();
  const { getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const paymentMethods = [
    { id: 'cash', name: 'Cash on Delivery', icon: '💵' },
    { id: 'ovo', name: 'OVO', icon: '🟣' },
    { id: 'gopay', name: 'GoPay', icon: '🔵' },
    { id: 'dana', name: 'DANA', icon: '🟠' },
    { id: 'shopeepay', name: 'ShopeePay', icon: '🔴' },
    { id: 'card', name: 'Credit / Debit Card', icon: '💳' },
  ];

  const handlePayNow = () => {
    // Simulate order placement
    clearCart();
    navigate('/success');
  };

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2">Payment</Typography>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        {/* Payment Methods */}
        <div>
          <Typography variant="h3" className="mb-3 text-sm text-mixue-dark font-semibold">Payment Method</Typography>
          <div className="bg-white rounded-2xl shadow-card overflow-hidden">
            {paymentMethods.map((method, index) => (
              <div 
                key={method.id}
                className={`flex items-center p-4 cursor-pointer ${index !== paymentMethods.length - 1 ? 'border-b border-gray-100' : ''}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <div className="w-6 h-6 flex items-center justify-center mr-3 text-lg">
                  {method.icon}
                </div>
                <Typography variant="body1" className="font-medium text-sm flex-1">{method.name}</Typography>
                {paymentMethod === method.id ? (
                  <CheckCircle2 size={20} className="text-mixue-red" />
                ) : (
                  <Circle size={20} className="text-gray-200" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Apply Voucher */}
        <div>
          <Typography variant="h3" className="mb-3 text-sm text-mixue-dark font-semibold">Apply Voucher</Typography>
          <div className="flex gap-2">
            <Input placeholder="Enter voucher code..." className="flex-1" />
            <Button variant="outline" className="px-6">Apply</Button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-bottom-nav z-20 pb-safe flex items-center justify-between">
        <div>
          <Typography variant="caption" className="text-mixue-gray block">Total Payment</Typography>
          <Typography variant="h2" className="text-mixue-red">Rp {getTotal().toLocaleString('id-ID')}</Typography>
        </div>
        <Button size="lg" className="w-32" onClick={handlePayNow}>
          Pay Now
        </Button>
      </div>
    </div>
  );
};
