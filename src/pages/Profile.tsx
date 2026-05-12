import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Settings, HelpCircle, LogOut, Heart, MapPin, CreditCard, ShoppingBag, Edit2 } from 'lucide-react';
import { Typography } from '../components/Typography';
import { useUserStore } from '../store/userStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { name, phone, pfp, setName, setPfp } = useUserStore();
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const [editNameValue, setEditNameValue] = useState(name);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPfp(reader.result as string);
        showToast("PFP updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const saveName = () => {
    const newName = editNameValue.trim();
    if (newName && newName !== name) {
      setName(newName);
      showToast("Name updated!");
    } else {
      setEditNameValue(name); // Reset if empty
    }
    setIsEditingName(false);
  };

  const menuItems = [
    { id: 'orders', icon: <ShoppingBag size={20} />, label: 'My Orders', action: () => navigate('/orders') },
    { id: 'favorites', icon: <Heart size={20} />, label: 'Favorites', action: () => navigate('/favorites') },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Addresses', action: () => navigate('/addresses') },
    { id: 'payment', icon: <CreditCard size={20} />, label: 'Payment Methods', action: () => navigate('/payment-methods') },
    { id: 'promo', icon: <span className="text-xl">🎫</span>, label: 'Promo & Vouchers', action: () => navigate('/promos') },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings', action: () => navigate('/settings') },
    { id: 'help', icon: <HelpCircle size={20} />, label: 'Help & Support', action: () => navigate('/support') },
    { id: 'logout', icon: <LogOut size={20} />, label: 'Logout', action: () => {
      localStorage.removeItem('isAuthenticated');
      navigate('/auth/login');
    } },
  ];

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-mixue-dark text-white px-6 py-3 rounded-full shadow-lg z-50 animate-fade-in flex items-center transition-all">
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Profile Card */}
      <div className="bg-mixue-red px-6 pt-12 pb-8 rounded-b-3xl text-white relative shadow-sm">
        <div className="flex items-center">
          <div 
            className="w-16 h-16 bg-white rounded-full p-1 mr-4 shrink-0 relative cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-full h-full bg-red-50 rounded-full flex items-center justify-center text-2xl overflow-hidden relative">
              {pfp ? (
                <img src={pfp} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span>⛄</span>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Edit2 size={16} className="text-white" />
              </div>
            </div>
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          
          <div className="flex-1 min-w-0">
            {isEditingName ? (
              <input
                type="text"
                autoFocus
                className="w-full bg-white/20 text-white placeholder:text-white/60 border border-white/40 rounded px-2 py-1 mb-1 focus:outline-none focus:ring-2 focus:ring-white/50 text-xl font-bold"
                value={editNameValue}
                onChange={(e) => setEditNameValue(e.target.value)}
                onBlur={saveName}
                onKeyDown={(e) => e.key === 'Enter' && saveName()}
              />
            ) : (
              <div className="flex items-center gap-2 mb-1 group cursor-pointer" onClick={() => { setIsEditingName(true); setEditNameValue(name); }}>
                <Typography variant="h2" className="text-white truncate">{name}</Typography>
                <Edit2 size={14} className="text-white/60 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            <Typography variant="caption" className="text-white/80 block">{phone}</Typography>
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
