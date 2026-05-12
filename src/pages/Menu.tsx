import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { categories, mockProducts } from '../data/mockData';
import { Typography } from '../components/Typography';
import { Chip } from '../components/Chip';
import { useAnimationStore } from '../components/CartAnimationOverlay';
import { useCartStore } from '../store/cartStore';

export const Menu: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  let filteredProducts = activeCategory === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.category === activeCategory);

  if (searchQuery.trim()) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const triggerAnimation = useAnimationStore(state => state.trigger);
  const addItem = useCartStore(state => state.addItem);

  const handleQuickAdd = (product: typeof mockProducts[0], e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Calculate starting point (the center of the button that was clicked)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    // Trigger flying animation
    triggerAnimation({ startX, startY, image: product.image });
    
    // Add to cart with default variants
    const defaultVariants: Record<string, any> = {};
    if (product.variants) {
      product.variants.forEach(group => {
        defaultVariants[group.name] = group.options[0];
      });
    }
    
    addItem(product, defaultVariants, 1);
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-white z-20 overflow-hidden min-h-[60px]">
        {/* Normal Header */}
        <div className={`absolute inset-0 px-4 flex items-center justify-between bg-white transition-all duration-300 ease-in-out ${isSearching ? 'opacity-0 -translate-y-full pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={24} className="text-mixue-dark" />
          </button>
          <Typography variant="h2" className="flex-1 text-center pr-2">
            {categories.find(c => c.id === activeCategory)?.name || 'Menu'}
          </Typography>
          <button 
            className="p-1"
            onClick={() => {
              setIsSearching(true);
              setTimeout(() => searchInputRef.current?.focus(), 50);
            }}
          >
            <Search size={24} className="text-mixue-dark" />
          </button>
        </div>

        {/* Search Header Overlay */}
        <div className={`absolute inset-0 px-4 flex items-center bg-white transition-all duration-300 ease-in-out ${isSearching ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>
          <div className="flex-1 flex items-center bg-gray-100 rounded-full px-4 py-2">
            <Search size={18} className="text-mixue-gray mr-2" />
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="Search drinks..."
              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-mixue-dark placeholder:text-mixue-gray"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="w-5 h-5 bg-gray-300 hover:bg-gray-400 transition-colors rounded-full flex items-center justify-center text-white text-xs ml-2"
              >
                ✕
              </button>
            )}
          </div>
          <button 
            className="ml-3 text-mixue-red font-semibold text-sm active:opacity-70 transition-opacity"
            onClick={() => {
              setIsSearching(false);
              setSearchQuery('');
            }}
          >
            Cancel
          </button>
        </div>
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
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center opacity-50">
            <Search size={48} className="text-mixue-gray mb-4" />
            <Typography variant="body1" className="text-mixue-gray">
              No drinks found matching "{searchQuery}"
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};
