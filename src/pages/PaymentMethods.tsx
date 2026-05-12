import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Typography } from '../components/Typography';

export const PaymentMethods: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2">Payment Methods</Typography>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <span className="text-6xl mb-4">💳</span>
        <Typography variant="h2" className="mb-2">Coming Soon</Typography>
        <Typography variant="body1" className="text-mixue-gray">
          Payment methods management is under development.
        </Typography>
      </div>
    </div>
  );
};
