import React from 'react';
import { Home, Menu as MenuIcon, ShoppingBag, Heart, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/home' },
    { id: 'menu', label: 'Menu', icon: MenuIcon, path: '/menu' },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/orders' },
    { id: 'favorites', label: 'Favorites', icon: Heart, path: '/favorites' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  // Don't show bottom nav on these routes
  const hideOnRoutes = ['/', '/auth/login', '/auth/register', '/cart', '/checkout', '/payment', '/success'];
  
  if (hideOnRoutes.includes(location.pathname) || location.pathname.startsWith('/product') || location.pathname.startsWith('/tracking')) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white border-t border-gray-100 pb-safe shadow-bottom-nav z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center w-full h-full focus:outline-none overflow-hidden"
            >
              {/* Top animated indicator bar */}
              <div 
                className={`absolute top-0 w-8 h-1 bg-mixue-red rounded-b-md transition-all duration-300 ease-out ${
                  isActive ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}
              />

              <div className={`relative flex items-center justify-center transition-all duration-300 ${
                isActive ? '-translate-y-1 mt-1' : 'translate-y-0 mt-0'
              }`}>
                {/* Active background blob */}
                <div 
                  className={`absolute w-10 h-10 bg-mixue-red/10 rounded-full transition-all duration-500 ease-out ${
                    isActive ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                  }`} 
                />
                
                <Icon 
                  size={24} 
                  className={`relative z-10 transition-all duration-300 ${
                    isActive ? 'text-mixue-red scale-110' : 'text-mixue-gray scale-100 hover:text-mixue-red/70'
                  }`} 
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              
              <span className={`text-[10px] transition-all duration-300 ${
                isActive ? 'text-mixue-red font-semibold opacity-100 translate-y-0' : 'text-mixue-gray font-medium opacity-80 translate-y-0.5'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
