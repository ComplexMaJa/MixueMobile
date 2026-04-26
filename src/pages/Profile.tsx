import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, HelpCircle, LogOut, Heart, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { Typography } from '../components/Typography';

export const Profile: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'orders', icon: <ShoppingBag size={20} />, label: 'My Orders' },
    { id: 'favorites', icon: <Heart size={20} />, label: 'Favorites' },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Addresses' },
    { id: 'payment', icon: <CreditCard size={20} />, label: 'Payment Methods' },
    { id: 'promo', icon: <span className="text-xl">🎫</span>, label: 'Promo & Vouchers' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help & Support' },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', action: () => navigate('/auth/login') },
  ];

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative pb-20">
      {/* Header Profile Card */}
      <div className="bg-mixue-red px-6 pt-12 pb-8 rounded-b-3xl text-white relative shadow-sm">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-white rounded-full p-1 mr-4 shrink-0">
             {/* Mascot Avatar Placeholder */}
            <div className="w-full h-full bg-red-50 rounded-full flex items-center justify-center text-2xl">
              ⛄
            </div>
          </div>
          <div>
            <Typography variant="h2" className="text-white mb-1">Mixue Lover</Typography>
            <Typography variant="caption" className="text-white/80">+62 812 3456 7890</Typography>
          </div>
        </div>
      </div>

      {/* Stats Card overlay */}
      <div className="px-4 -mt-6 z-10 relative mb-6">
        <div className="bg-white rounded-2xl shadow-card flex p-4 divide-x divide-gray-100">
          <div className="flex-1 text-center px-2">
            <Typography variant="caption" className="text-mixue-gray block mb-1">My Points</Typography>
            <Typography variant="h2" className="text-mixue-dark">1,250</Typography>
          </div>
          <div className="flex-1 text-center px-2">
            <Typography variant="caption" className="text-mixue-gray block mb-1">Vouchers</Typography>
            <Typography variant="h2" className="text-mixue-dark">5</Typography>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-4 flex-1 overflow-y-auto hide-scrollbar">
        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
          {menuItems.map((item, index) => (
            <div 
              key={item.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 active:bg-gray-100 transition-colors ${index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''}`}
              onClick={item.action}
            >
              <div className="text-mixue-gray mr-4">{item.icon}</div>
              <Typography variant="body1" className="font-medium text-sm flex-1">{item.label}</Typography>
              <ChevronRight size={20} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
