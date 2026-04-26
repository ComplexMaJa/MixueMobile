import React from 'react';
import { Bell, MapPin, Search } from 'lucide-react';
import { Input } from '../components/Input';
import { Typography } from '../components/Typography';
import { categories, popularProducts, recommendedProducts } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();

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
          <button className="relative p-2">
            <Bell size={24} className="text-mixue-dark" />
            <span className="absolute top-1 right-2 w-2 h-2 bg-mixue-red rounded-full border border-white"></span>
          </button>
        </div>
        
        <div onClick={() => navigate('/menu')}>
          <Input 
            placeholder="Search menu, drinks..." 
            leftIcon={<Search size={20} />} 
            readOnly
            className="bg-gray-50 border-transparent pointer-events-none"
          />
        </div>
      </div>

      <div className="overflow-y-auto">
        {/* Promo Banner */}
        <div className="px-4 mt-4">
          <div className="bg-mixue-red rounded-2xl p-5 relative overflow-hidden h-36 flex items-center">
            <div className="z-10 w-2/3">
              <span className="bg-white text-mixue-red text-xs font-bold px-2 py-0.5 rounded uppercase mb-2 inline-block">MIXUE</span>
              <Typography variant="h1" className="text-white text-2xl leading-tight mb-2">HOT DAY<br/>COOL YOU!</Typography>
              <span className="bg-yellow-400 text-mixue-dark text-xs font-bold px-2 py-1 rounded">DISCOUNT UP TO 20%</span>
            </div>
            {/* Mascot Placeholder */}
            <div className="absolute -right-4 bottom-0 w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-6xl">⛄</span>
            </div>
          </div>
          <div className="flex justify-center mt-3 space-x-1.5">
            <div className="w-4 h-1.5 bg-mixue-red rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full"></div>
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
                    <button className="w-6 h-6 bg-mixue-red rounded-full flex items-center justify-center text-white text-lg leading-none pb-0.5">
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
