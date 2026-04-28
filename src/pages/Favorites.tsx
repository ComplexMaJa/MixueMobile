import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../components/Typography';
import { mockProducts } from '../data/mockData';
import { useFavoriteStore } from '../store/favoriteStore';
import { Heart, Star, Plus } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAnimationStore } from '../components/CartAnimationOverlay';

export const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useFavoriteStore();
  const addItem = useCartStore(state => state.addItem);
  const triggerAnimation = useAnimationStore(state => state.trigger);
  
  const favoriteProducts = mockProducts.filter(p => favorites.includes(p.id));

  const handleQuickAdd = (e: React.MouseEvent, product: typeof mockProducts[0]) => {
    e.stopPropagation();
    
    // Calculate starting point (the center of the button that was clicked)
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    // Trigger flying animation
    triggerAnimation({ startX, startY, image: product.image });
    
    // Use default variants
    const defaultVariants: Record<string, any> = {};
    product.variants?.forEach(group => {
      if (group.options.length > 0) {
        defaultVariants[group.name] = group.options[0];
      }
    });
    addItem(product, defaultVariants, 1);
  };

  return (
    <div className="flex flex-col h-full bg-mixue-bg relative pb-20">
      {/* Header */}
      <div className="bg-white px-4 py-4 sticky top-0 z-10 shadow-sm border-b border-gray-100 flex justify-center items-center">
        <Typography variant="h2">My Favorites</Typography>
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {favoriteProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-2xl p-3 shadow-card flex flex-col active:scale-[0.98] transition-transform cursor-pointer"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-3">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  <button 
                    className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                  >
                    <Heart size={16} className="text-mixue-red" fill="currentColor" />
                  </button>
                </div>
                
                <Typography variant="body1" className="font-semibold text-sm leading-tight mb-1 line-clamp-2">
                  {product.name}
                </Typography>
                
                <div className="flex items-center mb-2">
                  <Star size={12} className="text-yellow-400 mr-1" fill="currentColor" />
                  <Typography variant="caption" className="font-semibold">{product.rating}</Typography>
                </div>
                
                <div className="mt-auto flex items-center justify-between">
                  <Typography variant="h3" className="text-mixue-red text-sm">
                    Rp {(product.price / 1000).toFixed(0)}k
                  </Typography>
                  <button 
                    className="w-8 h-8 bg-mixue-red rounded-full flex items-center justify-center shadow-sm active:scale-90 transition-transform"
                    onClick={(e) => handleQuickAdd(e, product)}
                  >
                    <Plus size={16} className="text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <Heart size={48} className="text-gray-200 mb-4" />
            <Typography variant="h3" className="mb-2">No favorites yet</Typography>
            <Typography variant="body1" className="text-mixue-gray text-sm max-w-[250px]">
              Tap the heart icon on any product to save it here for later.
            </Typography>
            <button 
              onClick={() => navigate('/menu')}
              className="mt-6 px-6 py-2 bg-mixue-red text-white rounded-full font-semibold active:scale-95 transition-transform"
            >
              Browse Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
