import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { Typography } from '../components/Typography';
import { useOrderStore } from '../store/orderStore';

export const OrderTracking: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const order = useOrderStore(state => state.orders.find(o => o.id === id));
  const updateOrderStatus = useOrderStore(state => state.updateOrderStatus);
  
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!order) return;
    
    // Initial elapsed calculation
    setElapsed(Math.floor((Date.now() - order.createdAt) / 1000));
    
    // Update every second
    const interval = setInterval(() => {
      const secondsPassed = Math.floor((Date.now() - order.createdAt) / 1000);
      setElapsed(secondsPassed);
      
      let newStatus = order.status;
      if (secondsPassed >= 45 && order.status !== 'Completed') {
        newStatus = 'Completed';
      } else if (secondsPassed >= 30 && secondsPassed < 45 && order.status !== 'Delivering') {
        newStatus = 'Delivering';
      } else if (secondsPassed >= 15 && secondsPassed < 30 && order.status !== 'Preparing') {
        newStatus = 'Preparing';
      }
      
      if (newStatus !== order.status) {
        updateOrderStatus(order.id, newStatus);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [order, updateOrderStatus]);

  if (!order) {
    return (
      <div className="flex flex-col h-full bg-mixue-bg p-4 justify-center items-center">
        <Typography variant="h3">Order not found</Typography>
        <button onClick={() => navigate('/orders')} className="mt-4 font-bold text-mixue-red">Back to Orders</button>
      </div>
    );
  }

  // Calculate times for timeline based on createdAt
  const formatTime = (timeAdd: number) => {
    return new Date(order.createdAt + timeAdd).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const timeline = [
    { 
      status: 'Order Received', 
      time: formatTime(0), 
      active: true, 
      current: elapsed < 15 
    },
    { 
      status: 'Preparing', 
      time: elapsed >= 15 ? formatTime(15000) : 'Waiting...', 
      active: elapsed >= 15, 
      current: elapsed >= 15 && elapsed < 30 
    },
    { 
      status: 'On The Way', 
      time: elapsed >= 30 ? formatTime(30000) : 'Waiting...', 
      active: elapsed >= 30, 
      current: elapsed >= 30 && elapsed < 45 
    },
    { 
      status: 'Delivered', 
      time: elapsed >= 45 ? formatTime(45000) : 'Waiting for delivery', 
      active: elapsed >= 45, 
      current: elapsed >= 45 
    },
  ];

  const estimatedSecsLeft = Math.max(0, 45 - elapsed);

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm border-b border-gray-100">
        <button onClick={() => navigate(-1)} className="p-1">
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
            {elapsed >= 30 && elapsed < 45 ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-12 -translate-y-12 transition-all duration-1000 animate-pulse">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-mixue-red">
                   <span className="text-xl">🛵</span>
                 </div>
              </div>
            ) : elapsed >= 45 ? (
              <div className="absolute top-1/2 left-1/2 transform translate-x-16 translate-y-12 transition-all duration-1000">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-mixue-red">
                   <span className="text-xl">🛵</span>
                 </div>
              </div>
            ) : (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-24 -translate-y-24 transition-all duration-1000">
                 <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-mixue-red">
                   <span className="text-xl">🛵</span>
                 </div>
              </div>
            )}
            
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
                <Typography variant="body1" className="font-semibold text-sm">{order.id}</Typography>
              </div>
              <div className="text-right">
                <Typography variant="caption" className="text-mixue-gray">Estimated Time</Typography>
                <Typography variant="body1" className="font-bold text-mixue-red text-sm">
                  {elapsed >= 45 ? 'Arrived!' : `${estimatedSecsLeft} secs left`}
                </Typography>
              </div>
            </div>

            {/* Timeline Stepper */}
            <div className="pl-2 pt-2">
              {timeline.map((item, index) => (
                <div key={index} className="flex relative pb-6 last:pb-0">
                  {/* Line connecting dots */}
                  {index !== timeline.length - 1 && (
                    <div className={`absolute left-[7px] top-6 bottom-0 w-[2px] -ml-[1px] ${item.active && timeline[index + 1].active ? 'bg-mixue-red' : 'bg-gray-200'} transition-colors duration-500`}></div>
                  )}
                  
                  {/* Dot */}
                  <div className="relative z-10 flex items-center justify-center w-4 h-4 mt-1 mr-4 shrink-0">
                    {item.current ? (
                      <div className="w-4 h-4 rounded-full border-4 border-red-200 bg-mixue-red animate-pulse"></div>
                    ) : (
                      <div className={`w-3 h-3 rounded-full transition-colors duration-500 ${item.active ? 'bg-mixue-red' : 'bg-gray-200'}`}></div>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div>
                    <Typography 
                      variant="body1" 
                      className={`font-semibold text-sm mb-0.5 transition-colors duration-500 ${item.current ? 'text-mixue-red' : (item.active ? 'text-mixue-dark' : 'text-mixue-gray')}`}
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
