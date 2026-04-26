import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';

export const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();
  const simulatedOrderId = `MX${new Date().getTime().toString().slice(-10)}`;

  return (
    <div className="flex flex-col h-full bg-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <CheckCircle size={80} className="text-mixue-red mb-6" />
        <Typography variant="h1" className="mb-2">Order Success!</Typography>
        <Typography variant="body1" className="text-mixue-gray px-4 mb-8">
          Your order has been placed successfully.
        </Typography>

        <div className="w-full bg-gray-50 rounded-2xl p-6 text-left mb-8">
          <div className="mb-4">
            <Typography variant="caption" className="text-mixue-gray">Order ID</Typography>
            <Typography variant="body1" className="font-semibold">{simulatedOrderId}</Typography>
          </div>
          <div>
            <Typography variant="caption" className="text-mixue-gray">Estimated Time</Typography>
            <Typography variant="body1" className="font-semibold">30 - 40 mins</Typography>
          </div>
        </div>
      </div>

      <div className="pb-safe pt-4">
        <Button fullWidth size="lg" className="mb-4" onClick={() => navigate(`/tracking/${simulatedOrderId}`)}>
          Track Order
        </Button>
        <Button fullWidth size="lg" variant="ghost" onClick={() => navigate('/home')}>
          Back to Home
        </Button>
      </div>
    </div>
  );
};
