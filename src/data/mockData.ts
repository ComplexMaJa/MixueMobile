import BobaSundaeImg from '../assets/Products/Boba_Sundae.png';
import ChocolateSundaeImg from '../assets/Products/CCS.png';
import StrawberrySundaeImg from '../assets/Products/CLS.png';
import HawaiianTeaImg from '../assets/Products/HawaiianTea.jpg';
import KiwiFruitTeaImg from '../assets/Products/KiwiFruitTea.jpg';
import OatsMilkTeaImg from '../assets/Products/OatsMilkTea.jpg';
import RedBeanMilkTeaImg from '../assets/Products/RedBeanMilkTea.jpg';
import JasmineTeaImg from '../assets/Products/JasmineTea.jpg';
import EarlTeaImg from '../assets/Products/EarlTea.jpg';
import EAGITImg from '../assets/Products/EAGIT.png';

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

const defaultIceAndSugarVariants = [
  {
    name: 'Sugar Level',
    options: [
      { id: 'normal', name: 'Normal', priceModifier: 0 },
      { id: 'less', name: 'Less Sugar', priceModifier: 0 },
      { id: 'extra', name: 'Extra Sugar', priceModifier: 0 },
    ]
  },
  {
    name: 'Ice Level',
    options: [
      { id: 'normal', name: 'Normal Ice', priceModifier: 0 },
      { id: 'less', name: 'Less Ice', priceModifier: 0 },
      { id: 'no-ice', name: 'No Ice', priceModifier: 0 },
    ]
  }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Boba Sundae',
    price: 16000,
    rating: 4.9,
    reviewsCount: 1200,
    image: BobaSundaeImg,
    category: 'sundae',
    description: 'Signature vanilla ice cream topped with brown sugar boba.',
    badges: ['BEST SELLER'],
    variants: [
      {
        name: 'Size',
        options: [
          { id: 'regular', name: 'Regular', priceModifier: 0 },
          { id: 'large', name: 'Large', priceModifier: 3000 },
        ]
      },
      ...defaultIceAndSugarVariants
    ]
  },
  {
    id: '2',
    name: 'Strawberry Lucky Sundae',
    price: 16000,
    rating: 4.8,
    reviewsCount: 850,
    image: StrawberrySundaeImg,
    category: 'sundae',
    description: 'Delicious vanilla ice cream topped with real strawberry fruit jam.',
    badges: ['PROMO'],
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '3',
    name: 'Chocolate Lucky Sundae',
    price: 16000,
    rating: 4.8,
    reviewsCount: 930,
    image: ChocolateSundaeImg,
    category: 'sundae',
    description: 'Classic vanilla ice cream generously drizzled with rich chocolate sauce.',
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '4',
    name: 'Hawaiian Fruit Tea',
    price: 22000,
    rating: 4.9,
    reviewsCount: 2100,
    image: HawaiianTeaImg,
    category: 'fruit-tea',
    description: 'Refreshing fruit tea with fresh Hawaiian fruits.',
    badges: ['BEST SELLER'],
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '5',
    name: 'Kiwi Fruit Tea',
    price: 15000,
    rating: 4.8,
    reviewsCount: 1500,
    image: KiwiFruitTeaImg,
    category: 'fruit-tea',
    description: 'Refreshing iced tea made with freshly squeezed kiwis.',
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '6',
    name: 'Oats Milk Tea',
    price: 19000,
    rating: 4.7,
    reviewsCount: 1100,
    image: OatsMilkTeaImg,
    category: 'tea',
    description: 'Creamy milk tea blended with healthy oats.',
    badges: ['NEW'],
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '7',
    name: 'Red Bean Milk Tea',
    price: 19000,
    rating: 4.6,
    reviewsCount: 950,
    image: RedBeanMilkTeaImg,
    category: 'tea',
    description: 'Classic milk tea with sweet and soft red beans.',
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '8',
    name: 'Jasmine Tea',
    price: 10000,
    rating: 4.8,
    reviewsCount: 3200,
    image: JasmineTeaImg,
    category: 'tea',
    description: 'Traditional and refreshing jasmine green tea.',
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '9',
    name: 'Earl Grey Tea',
    price: 10000,
    rating: 4.7,
    reviewsCount: 2800,
    image: EarlTeaImg,
    category: 'tea',
    description: 'Classic Earl Grey tea with a distinct citrusy bergamot flavor.',
    variants: [...defaultIceAndSugarVariants]
  },
  {
    id: '10',
    name: 'Earl Grey Ice Tea',
    price: 12000,
    rating: 4.8,
    reviewsCount: 1500,
    image: EAGITImg,
    category: 'tea',
    description: 'Refreshing Earl Grey ice tea perfect for a hot day.',
    badges: ['PROMO'],
    variants: [...defaultIceAndSugarVariants]
  }
];

export const recommendedProducts = mockProducts.filter(p => p.badges?.includes('BEST SELLER') || p.badges?.includes('PROMO'));
export const popularProducts = mockProducts.slice(0, 4);
