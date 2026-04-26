export interface VariantOption {
  id: string;
  name: string;
  priceModifier: number;
}

export interface VariantGroup {
  name: string;
  options: VariantOption[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description: string;
  variants?: VariantGroup[];
  badges?: ('PROMO' | 'NEW' | 'BEST SELLER')[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  selectedVariants: Record<string, VariantOption>;
  quantity: number;
  note?: string;
  totalItemPrice: number;
}

// Simulated categories based on the design
export const categories: Category[] = [
  { id: 'all', name: 'All', icon: '🍽️' },
  { id: 'ice-cream', name: 'Ice Cream', icon: '🍦' },
  { id: 'tea', name: 'Tea', icon: '🍵' },
  { id: 'fruit-tea', name: 'Fruit Tea', icon: '🍹' },
  { id: 'sundae', name: 'Sundae', icon: '🍨' },
  { id: 'smoothies', name: 'Smoothies', icon: '🥤' },
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Mixue Ice Cream',
    price: 8000,
    rating: 4.9,
    reviewsCount: 1200,
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'ice-cream',
    description: 'Classic vanilla ice cream with smooth and creamy taste.',
    badges: ['BEST SELLER'],
    variants: [
      {
        name: 'Choose Cone',
        options: [
          { id: 'cup', name: 'Cup', priceModifier: 0 },
          { id: 'cone', name: 'Cone', priceModifier: 0 },
          { id: 'waffle', name: 'Waffle Cone', priceModifier: 2000 },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Strawberry Lucky Sundae',
    price: 16000,
    rating: 4.9,
    reviewsCount: 850,
    image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'sundae',
    description: 'Delicious vanilla ice cream topped with real strawberry fruit jam.',
    badges: ['PROMO'],
    variants: [
      {
        name: 'Sugar Level',
        options: [
          { id: 'normal', name: 'Normal', priceModifier: 0 },
          { id: 'less', name: 'Less Sugar', priceModifier: 0 },
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Mango Sundae',
    price: 16000,
    rating: 4.8,
    reviewsCount: 620,
    image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'sundae',
    description: 'Creamy vanilla ice cream mixed with fresh mango chunks and syrup.',
  },
  {
    id: '4',
    name: 'Chocolate Sundae',
    price: 16000,
    rating: 4.8,
    reviewsCount: 930,
    image: 'https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'sundae',
    description: 'Classic vanilla ice cream generously drizzled with rich chocolate sauce.',
  },
  {
    id: '5',
    name: 'Brown Sugar Boba Milk Tea',
    price: 16000,
    rating: 4.9,
    reviewsCount: 2100,
    image: 'https://images.unsplash.com/photo-1558857563-b37103caab86?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'tea',
    description: 'Signature milk tea with slow-cooked brown sugar boba.',
    badges: ['BEST SELLER'],
    variants: [
      {
        name: 'Size',
        options: [
          { id: 'regular', name: 'Regular', priceModifier: 0 },
          { id: 'large', name: 'Large', priceModifier: 3000 },
        ]
      },
      {
        name: 'Sugar Level',
        options: [
          { id: 'normal', name: 'Normal', priceModifier: 0 },
          { id: 'less', name: 'Less Sugar', priceModifier: 0 },
        ]
      }
    ]
  },
  {
    id: '6',
    name: 'Fresh Lemonade',
    price: 12000,
    rating: 4.8,
    reviewsCount: 1500,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'fruit-tea',
    description: 'Refreshing iced lemonade made with freshly squeezed lemons.',
    variants: [
      {
        name: 'Ice Level',
        options: [
          { id: 'normal', name: 'Normal Ice', priceModifier: 0 },
          { id: 'less', name: 'Less Ice', priceModifier: 0 },
          { id: 'no-ice', name: 'No Ice', priceModifier: 0 },
        ]
      }
    ]
  }
];

export const recommendedProducts = mockProducts.filter(p => p.badges?.includes('BEST SELLER') || p.badges?.includes('PROMO'));
export const popularProducts = mockProducts.slice(0, 4);
