import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, VariantOption } from '../data/mockData';

// Re-export type if needed, or just define inline
// Wait, CartItem is defined in data/mockData? Let's add it there or here. 
// I'll define the state types here.

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variants: Record<string, VariantOption>, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getDeliveryFee: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, variants, quantity) => {
        set((state) => {
          // Generate a unique ID based on product and selected variants
          const variantKey = Object.values(variants).map(v => v.id).sort().join('-');
          const itemId = `${product.id}-${variantKey}`;
          
          const existingItemIndex = state.items.findIndex(item => item.id === itemId);
          
          if (existingItemIndex >= 0) {
            // Update quantity if item already exists
            const newItems = [...state.items];
            newItems[existingItemIndex].quantity += quantity;
            return { items: newItems };
          }
          
          // Calculate base price + variant modifiers
          const variantExtraPrice = Object.values(variants).reduce((sum, v) => sum + v.priceModifier, 0);
          const totalItemPrice = product.price + variantExtraPrice;
          
          const newItem: CartItem = {
            id: itemId,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            basePrice: product.price,
            selectedVariants: variants,
            quantity,
            totalItemPrice
          };
          
          return { items: [...state.items, newItem] };
        });
      },
      
      removeItem: (itemId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== itemId)
        }));
      },
      
      updateQuantity: (itemId, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getSubtotal: () => {
        return get().items.reduce((total, item) => total + (item.totalItemPrice * item.quantity), 0);
      },
      
      getDeliveryFee: () => {
        return get().items.length > 0 ? 8000 : 0; // Mock delivery fee 8000
      },
      
      getTotal: () => {
        return get().getSubtotal() + get().getDeliveryFee();
      }
    }),
    {
      name: 'mixue-cart-storage',
    }
  )
);
