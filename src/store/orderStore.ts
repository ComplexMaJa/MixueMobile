import { create } from 'zustand';
import type { CartItem } from '../data/mockData';

export interface Order {
  id: string;
  status: 'Preparing' | 'Delivering' | 'Completed';
  date: string;
  total: number;
  products: { name: string; qty: number; image: string }[];
}

interface OrderState {
  orders: Order[];
  addOrder: (items: CartItem[], total: number) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  addOrder: (items, total) => set((state) => {
    const newOrder: Order = {
      id: `MX-${Math.floor(10000 + Math.random() * 90000)}`,
      status: 'Preparing',
      date: new Date().toLocaleString('en-US', { 
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
      }),
      total,
      products: items.map(item => ({
        name: item.productName,
        qty: item.quantity,
        image: item.productImage
      }))
    };
    return { orders: [newOrder, ...state.orders] };
  }),
  updateOrderStatus: (id, status) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === id ? { ...order, status } : order
    )
  }))
}));
