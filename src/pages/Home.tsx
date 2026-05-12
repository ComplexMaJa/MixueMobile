import React, { useState } from 'react';
import { Bell, MapPin, Search, X } from 'lucide-react';
import { Input } from '../components/Input';
import { Typography } from '../components/Typography';
import { categories, popularProducts, recommendedProducts, mockProducts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';
import { useAnimationStore } from '../components/CartAnimationOverlay';
import { useCartStore } from '../store/cartStore';

import Promo1 from '../assets/Promo1.png';
import Promo2 from '../assets/Promo2.png';
import Promo3 from '../assets/Promo3.png';
import Promo4 from '../assets/Promo4.png';

const promoImages = [Promo1, Promo2, Promo3, Promo4];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPromo, setCurrentPromo] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  React.useEffect(() => {
    // Auth check
    if (localStorage.getItem('isAuthenticated') !== 'true') {
      navigate('/auth/login');
      return;
    }

    const timer = setInterval(() => {
      setCurrentPromo(prev => (prev + 1) % promoImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [navigate]);

  const searchResults = searchQuery.trim()
    ? mockProducts.filter(p =>
        p.name.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.trim().toLowerCase())
      )
    : [];

  const triggerAnimation = useAnimationStore(state => state.trigger);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (product: typeof mockProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();

    // Calculate starting point
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;

    triggerAnimation({ startX, startY, image: product.image });

    const defaultVariants: Record<string, any> = {};
    if (product.variants) {
      product.variants.forEach(group => {
        defaultVariants[group.name] = group.options[0];
      });
    }

    addItem(product, defaultVariants, 1);
  };

  return (
    <div className="flex flex-col h-full bg-white relative pb-20">
      {/* Header */}
      <div className="px-4 pt-6 pb-2 sticky top-0 bg-white z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center mr-2">
              <MapPin size={18} className="text-mixue-red" />
            </div>
            <div>
              <Typography variant="caption" className="text-mixue-gray">Deliver to</Typography>
              <Typography variant="body1" className="font-semibold flex items-center">
                Jl. Merdeka No. 10 <span className="ml-1 text-xs">▼</span>
              </Typography>
            </div>
          </div>
          <button className="relative p-2" onClick={() => setShowNotif(true)}>
            <Bell size={24} className="text-mixue-dark" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-mixue-red rounded-full border border-white"></span>
          </button>
        </div>

        {/* Notification Toast */}
        {showNotif && (
          <div className="absolute top-16 right-4 bg-white rounded-xl shadow-lg border border-gray-100 py-3 pl-4 pr-2 z-50 flex items-center animate-fade-in w-[260px]">
            <div className="flex-1">
              <Typography variant="body1" className="font-bold text-sm text-mixue-dark">Bumi was here :3</Typography>
              <Typography variant="caption" className="text-[10px] text-mixue-gray">Just now</Typography>
            </div>
            <img 
              src="https://assets.stickerswiki.app/s/cindypack2/535bd968.thumb.webp" 
              alt="Bumi" 
              className="w-14 h-14 object-contain ml-2" 
            />
            <button 
              onClick={() => setShowNotif(false)} 
              className="text-gray-400 hover:text-gray-600 self-start -mt-2 ml-1"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div>
          <Input
            placeholder="Search menu, drinks..."
            leftIcon={<Search size={20} />}
            rightIcon={searchQuery ? <X size={18} /> : undefined}
            onRightIconClick={() => setSearchQuery('')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-50 border-transparent transition-all focus:bg-white focus:border-mixue-red focus:shadow-sm"
          />
        </div>
      </div>

      <div className="overflow-y-auto">
        {searchQuery.trim() ? (
          <div className="px-4 mt-4 mb-6">
            <Typography variant="h2" className="mb-4">Search Results</Typography>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {searchResults.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <div className="h-32 bg-gray-100 relative">
                      {product.badges && product.badges.length > 0 && (
                        <div className="absolute top-2 left-2 z-10">
                          <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                            {product.badges[0]}
                          </span>
                        </div>
                      )}
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-3 flex-1 flex flex-col">
                      <Typography variant="body1" className="font-semibold text-xs leading-tight mb-1 line-clamp-2">
                        {product.name}
                      </Typography>
                      <div className="flex justify-between items-end mt-auto pt-2">
                        <Typography variant="body1" className="font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</Typography>
                        <button
                          className="w-6 h-6 bg-mixue-red rounded-full flex items-center justify-center text-white text-lg leading-none pb-0.5"
                          onClick={(e) => handleQuickAdd(product, e)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <span className="text-4xl mb-3">🔍</span>
                <Typography variant="body1" className="text-mixue-gray">No products found for "{searchQuery}"</Typography>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Promo Banner */}
            <div className="px-4 mt-4">
              <div className="rounded-2xl relative overflow-hidden h-36 flex items-center shadow-sm w-full">
                {promoImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Promo ${idx + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${idx === currentPromo ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-3 space-x-1.5">
                {promoImages.map((_, idx) => (
                  <div
                    key={idx}
                    onClick={() => setCurrentPromo(idx)}
                    className={`h-1.5 rounded-full cursor-pointer transition-all duration-300 ${idx === currentPromo ? 'w-4 bg-mixue-red' : 'w-1.5 bg-gray-300'}`}
                  ></div>
                ))}
              </div>
            </div>

        {/* Categories */}
        <div className="mt-6 pl-4 flex space-x-6 overflow-x-auto hide-scrollbar pb-2">
          {categories.slice(1).map(category => (
            <div
              key={category.id}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/menu')}
            >
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-2xl mb-2">
                {category.icon}
              </div>
              <Typography variant="caption" className="text-[10px] text-center font-medium">
                {category.name}
              </Typography>
            </div>
          ))}
          <div className="pr-4"></div>
        </div>

        {/* Popular Menu */}
        <div className="mt-6">
          <div className="flex justify-between items-center px-4 mb-4">
            <Typography variant="h2">Popular Menu</Typography>
            <button className="text-mixue-red text-sm font-semibold" onClick={() => navigate('/menu')}>See All</button>
          </div>
          <div className="pl-4 flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
            {popularProducts.map(product => (
              <div
                key={product.id}
                className="w-36 flex-shrink-0 bg-white rounded-2xl shadow-card p-3 cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="h-28 bg-gray-100 rounded-xl mb-3 overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <Typography variant="body1" className="font-semibold line-clamp-2 leading-tight mb-1 text-xs">
                  {product.name}
                </Typography>
                <div className="flex justify-between items-center mt-auto">
                  <Typography variant="body1" className="font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</Typography>
                  <div className="flex items-center text-[10px] text-mixue-gray">
                    <span className="text-yellow-400 mr-0.5">★</span>
                    {product.rating}
                  </div>
                </div>
              </div>
            ))}
            <div className="pr-4"></div>
          </div>
        </div>

        {/* Recommended for You */}
        <div className="mt-2 px-4 mb-6">
          <Typography variant="h2" className="mb-4">Recommended for You</Typography>
          <div className="grid grid-cols-2 gap-4">
            {recommendedProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-card overflow-hidden flex flex-col cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="h-32 bg-gray-100 relative">
                  {product.badges && product.badges.length > 0 && (
                    <div className="absolute top-2 left-2 z-10">
                      <span className="bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                        {product.badges[0]}
                      </span>
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-3 flex-1 flex flex-col">
                  <Typography variant="body1" className="font-semibold text-xs leading-tight mb-1 line-clamp-2">
                    {product.name}
                  </Typography>
                  <div className="flex justify-between items-end mt-auto pt-2">
                    <Typography variant="body1" className="font-bold text-sm">Rp {product.price.toLocaleString('id-ID')}</Typography>
                    <button
                      className="w-6 h-6 bg-mixue-red rounded-full flex items-center justify-center text-white text-lg leading-none pb-0.5"
                      onClick={(e) => handleQuickAdd(product, e)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
          </>
        )}
      </div>
    </div>
  );
};
