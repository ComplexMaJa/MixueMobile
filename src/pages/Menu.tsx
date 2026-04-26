import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { categories, mockProducts } from '../data/mockData';
import { Typography } from '../components/Typography';
import { Chip } from '../components/Chip';

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredProducts = activeCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  const handleQuickAdd = (product: typeof mockProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    // If product has variants, navigate to detail page to choose.
    // Otherwise, add directly. For simplicity in simulation, we'll navigate to detail page.
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-4 py-4 flex items-center justify-between sticky top-0 bg-white z-20">
        <button onClick={() => navigate(-1)} className="p-1">
          <ArrowLeft size={24} className="text-mixue-dark" />
        </button>
        <Typography variant="h2" className="flex-1 text-center pr-2">
          {categories.find(c => c.id === activeCategory)?.name || 'Menu'}
        </Typography>
        <button className="p-1">
          <Search size={24} className="text-mixue-dark" />
        </button>
      </div>

      {/* Category Chips */}
      <div className="px-4 py-2 flex space-x-2 overflow-x-auto hide-scrollbar border-b border-gray-100 sticky top-14 bg-white z-10">
        {categories.map(category => (
          <Chip 
            key={category.id} 
            active={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
            className="!px-3 !py-1 text-xs"
          >
            {category.name}
          </Chip>
        ))}
      </div>

      {/* Product List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
        {filteredProducts.map(product => (
          <div 
            key={product.id} 
            className="flex items-center cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="w-20 h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0 relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 pl-3 flex flex-col justify-center min-w-0 border-b border-gray-50 pb-3">
              <Typography variant="body1" className="font-semibold text-sm leading-tight mb-1">
                {product.name}
              </Typography>
              <Typography variant="h3" className="font-bold text-xs mb-1">
                Rp {product.price.toLocaleString('id-ID')}
              </Typography>
              <div className="flex items-center text-[10px] text-mixue-gray mb-1">
                <span className="text-yellow-400 mr-0.5">★</span>
                {product.rating}
              </div>
            </div>
            
            <div className="shrink-0 border-b border-gray-50 h-full flex items-center justify-end w-10 pb-3">
              <button 
                onClick={(e) => handleQuickAdd(product, e)}
                className="w-6 h-6 bg-mixue-red rounded-full flex items-center justify-center text-white text-lg leading-none pb-0.5"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
