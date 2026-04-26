import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Typography } from '../components/Typography';

export const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const timeline = [
    { status: 'Order Received', time: 'May 21, 10:30 AM', active: true },
    { status: 'Preparing', time: 'May 21, 10:35 AM', active: true },
    { status: 'On The Way', time: 'May 21, 10:50 AM', active: true, current: true },
    { status: 'Delivered', time: 'Waiting for delivery', active: false },
  ];

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <button onClick={() => navigate('/home')} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2">Order Tracking</Typography>
        <div className="w-6"></div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Fake Map Area */}
        <div className="h-64 bg-gray-200 relative w-full overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
            alt="Map" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Map route UI simulation */}
            <div className="absolute w-40 h-1 bg-mixue-red transform rotate-45"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-12 -translate-y-12">
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-mixue-red">
                 <span className="text-xl">🛵</span>
               </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform translate-x-16 translate-y-12 text-mixue-red">
              <MapPin size={32} fill="white" />
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="relative -mt-6 z-10 px-4">
          <div className="bg-white rounded-2xl p-5 shadow-card">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-4">
              <div>
                <Typography variant="caption" className="text-mixue-gray">Order ID</Typography>
                <Typography variant="body1" className="font-semibold text-sm">{id || 'MX202405210123'}</Typography>
              </div>
              <div className="text-right">
                <Typography variant="caption" className="text-mixue-gray">Estimated Time</Typography>
                <Typography variant="body1" className="font-bold text-mixue-red text-sm">30 - 40 mins</Typography>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="pl-2 pt-2">
              {timeline.map((item, index) => (
                <div key={index} className="flex relative pb-6 last:pb-0">
                  {/* Line connecting dots */}
                  {index !== timeline.length - 1 && (
                    <div className={`absolute left-[7px] top-6 bottom-0 w-[2px] -ml-[1px] ${item.active && timeline[index + 1].active ? 'bg-mixue-red' : 'bg-gray-200'}`}></div>
                  )}
                  
                  {/* Dot */}
                  <div className="relative z-10 flex items-center justify-center w-4 h-4 mt-1 mr-4 shrink-0">
                    {item.current ? (
                      <div className="w-4 h-4 rounded-full border-4 border-red-200 bg-mixue-red"></div>
                    ) : (
                      <div className={`w-3 h-3 rounded-full ${item.active ? 'bg-mixue-red' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <Typography 
                      variant="body1" 
                      className={`font-semibold text-sm mb-0.5 ${item.current ? 'text-mixue-red' : (item.active ? 'text-mixue-dark' : 'text-mixue-gray')}`}
                    >
                      {item.status}
                    </Typography>
                    <Typography variant="caption" className="text-[10px]">
                      {item.time}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
