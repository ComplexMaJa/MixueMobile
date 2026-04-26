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
              className="flex flex-col items-center justify-center w-full h-full space-y-1 focus:outline-none"
            >
              <Icon 
                size={24} 
                className={isActive ? 'text-mixue-red' : 'text-mixue-gray'} 
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className={`text-[10px] ${isActive ? 'text-mixue-red font-semibold' : 'text-mixue-gray'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
