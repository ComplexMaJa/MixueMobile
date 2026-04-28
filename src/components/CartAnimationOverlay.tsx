import React, { useEffect, useState } from 'react';
import { create } from 'zustand';

export interface FlyingItem {
  id: string;
  startX: number;
  startY: number;
  image: string;
}

interface AnimationStore {
  items: FlyingItem[];
  trigger: (item: Omit<FlyingItem, 'id'>) => void;
}

export const useAnimationStore = create<AnimationStore>((set) => ({
  items: [],
  trigger: (item) => {
    const id = Math.random().toString(36).substring(7);
    set((state) => ({ items: [...state.items, { ...item, id }] }));
    
    // Auto remove after animation completes
    setTimeout(() => {
      set((state) => ({ items: state.items.filter(i => i.id !== id) }));
    }, 800);
  }
}));

export const CartAnimationOverlay: React.FC = () => {
  const { items } = useAnimationStore();
  
  if (items.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100]">
      {items.map((item) => (
        <FlyingCard key={item.id} item={item} />
      ))}
    </div>
  );
};

const FlyingCard: React.FC<{ item: FlyingItem }> = ({ item }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Trigger animation next frame to allow starting position to apply
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setActive(true));
    });
  }, []);

  // Target coordinates for the floating cart button
  // Horizontal center + offset to hit the actual cart icon
  const targetX = window.innerWidth / 2 + 100;
  // Bottom - 84px - padding
  const targetY = window.innerHeight - 100;

  return (
    <div 
      className="fixed w-20 h-24 rounded-xl shadow-xl overflow-hidden z-[100]"
      style={{
        left: active ? targetX - 40 : item.startX - 40,
        top: active ? targetY - 48 : item.startY - 48,
        opacity: active ? 0 : 1,
        transform: active ? 'scale(0.1) rotate(15deg)' : 'scale(1) rotate(0deg)',
        // Parabolic arc: left is linear, top accelerates
        transition: 'left 700ms linear, top 700ms cubic-bezier(0.5, 0, 1, 0.5), transform 700ms cubic-bezier(0.5, 0, 1, 0.5), opacity 700ms ease-in'
      }}
    >
      <img src={item.image} alt="flying product" className="w-full h-full object-cover" />
    </div>
  );
};
