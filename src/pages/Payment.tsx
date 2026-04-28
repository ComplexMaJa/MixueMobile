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
    { id: 'cash', name: 'Cash on Delivery', icon: 'https://cdn-icons-png.flaticon.com/512/95/95986.png' },
    { id: 'ovo', name: 'OVO', icon: 'https://static.vecteezy.com/system/resources/previews/028/766/360/non_2x/ovo-ewallet-payment-icon-symbol-free-png.png' },
    { id: 'gopay', name: 'GoPay', icon: 'https://static.vecteezy.com/system/resources/previews/028/766/371/non_2x/gopay-payment-icon-symbol-free-png.png' },
    { id: 'dana', name: 'DANA', icon: 'https://static.vecteezy.com/system/resources/previews/028/766/359/non_2x/dana-payment-icon-symbol-free-png.png' },
    { id: 'shopeepay', name: 'ShopeePay', icon: 'https://play-lh.googleusercontent.com/fxPXbJL2IPQUYhWO4dQw_kd_GlMJzbzQSgghjaNuDNMz0HSt98HdsTDzeMMl9Yn37oq5=w240-h480-rw' },
    { id: 'card', name: 'Credit / Debit Card', icon: 'https://cdn-icons-png.freepik.com/512/60/60378.png' },
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
                <div className="w-8 h-8 flex items-center justify-center mr-3 shrink-0">
                  {method.icon ? (
                    <img src={method.icon} alt={method.name} className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-md border border-gray-200 bg-gray-50"></div>
                  )}
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
