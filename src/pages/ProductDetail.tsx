import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { mockProducts, type VariantOption } from '../data/mockData';
import { useCartStore } from '../store/cartStore';
import { useFavoriteStore } from '../store/favoriteStore';
import { Button } from '../components/Button';
import { Typography } from '../components/Typography';
import { Chip } from '../components/Chip';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const { toggleFavorite, isFavorite } = useFavoriteStore();
  
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, VariantOption>>(() => {
    const initial: Record<string, VariantOption> = {};
    product.variants?.forEach(group => {
      if (group.options.length > 0) {
        initial[group.name] = group.options[0];
      }
    });
    return initial;
  });

  const handleVariantSelect = (groupName: string, option: VariantOption) => {
    setSelectedVariants(prev => ({
      ...prev,
      [groupName]: option
    }));
  };

  const currentExtraPrice = Object.values(selectedVariants).reduce((sum, v) => sum + v.priceModifier, 0);
  const currentTotalPrice = (product.price + currentExtraPrice) * quantity;

  const handleAddToCart = () => {
    addItem(product, selectedVariants, quantity, note.trim() || undefined);
    navigate('/cart');
  };

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Hero Image & Header */}
      <div className="relative h-[300px] bg-red-50 shrink-0">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        
        {/* Top sticky actions */}
        <div className="absolute top-0 left-0 right-0 p-4 pt-6 flex justify-between z-10 bg-gradient-to-b from-black/30 to-transparent">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-mixue-dark"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-mixue-red active:scale-90 transition-transform"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart size={20} fill={isFavorite(product.id) ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        {/* Product Info */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start mb-2">
            <Typography variant="h1" className="text-xl pr-4">{product.name}</Typography>
            <div className="flex items-center bg-gray-50 px-2 py-1 rounded-full whitespace-nowrap">
              <span className="text-yellow-400 mr-1 text-xs">★</span>
              <Typography variant="caption" className="font-semibold text-mixue-dark">{product.rating}</Typography>
              <Typography variant="caption" className="ml-1 text-[10px]">({product.reviewsCount}+)</Typography>
            </div>
          </div>
          
          <Typography variant="h2" className="text-mixue-red mb-3">
            Rp {product.price.toLocaleString('id-ID')}
          </Typography>
          
          <Typography variant="body1" className="text-mixue-gray text-sm leading-relaxed">
            {product.description}
          </Typography>
        </div>

        {/* Variants */}
        {product.variants?.map((group) => (
          <div key={group.name} className="p-4 border-b border-gray-100">
            <Typography variant="h3" className="mb-3">{group.name}</Typography>
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => (
                <Chip
                  key={option.id}
                  active={selectedVariants[group.name]?.id === option.id}
                  onClick={() => handleVariantSelect(group.name, option)}
                >
                  <span className="flex flex-col items-center">
                    <span>{option.name}</span>
                    {option.priceModifier > 0 && (
                      <span className="text-[10px] opacity-80">+Rp {(option.priceModifier / 1000).toFixed(0)}k</span>
                    )}
                  </span>
                </Chip>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Notes */}
        <div className="p-4 border-b border-gray-100">
          <Typography variant="h3" className="mb-3">Special Instructions</Typography>
          <textarea
            className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-mixue-red focus:ring-1 focus:ring-mixue-red transition-all resize-none h-20"
            placeholder="E.g., less ice, extra sugar, etc."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
      </div>

      {/* Sticky Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-bottom-nav flex items-center justify-between pb-safe z-20">
        <div className="flex items-center border border-gray-200 rounded-full h-12 w-32 mr-4">
          <button 
            className="w-10 h-full flex items-center justify-center text-mixue-dark font-medium"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >-</button>
          <div className="flex-1 text-center font-semibold text-mixue-dark">{quantity}</div>
          <button 
            className="w-10 h-full flex items-center justify-center text-mixue-red font-medium"
            onClick={() => setQuantity(quantity + 1)}
          >+</button>
        </div>
        
        <Button size="lg" className="flex-1 flex flex-col items-center h-12 leading-tight" onClick={handleAddToCart}>
          <span className="font-semibold text-sm">Add to Cart</span>
          <span className="text-[10px] font-normal opacity-90">Rp {currentTotalPrice.toLocaleString('id-ID')}</span>
        </Button>
      </div>
    </div>
  );
};
