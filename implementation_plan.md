# Mixue Mobile PWA - Frontend Implementation Plan

This document outlines the complete architectural and technical plan for building the Mixue Mobile application as a Progressive Web App (PWA) using React (Vite), TypeScript, TailwindCSS, Zustand, and React Router.

## 1. App Overview, Scope Constraints & Philosophy

The application is a mobile-first food and beverage ordering PWA, heavily inspired by the Mixue brand experience. The core objective is to provide a seamless, native-like ordering experience through a web browser.

**CRITICAL SCOPE CONSTRAINTS & PHILOSOPHY:**
- **Avoid Overengineering:** Prioritize clarity, simplicity, and speed of implementation. Avoid unnecessary abstractions. The goal is a fast, functional frontend simulation.
- **Frontend Simulation Only:** There is no real backend, API, or live payment integration.
- **Mocked Data:** All products, categories, users, and orders will be driven by simple, hardcoded mock data.
- **Simulated Features:** Checkout and Order Tracking are UI simulations. No actual processing occurs.

**Core User Journey:**
1. **Entry**: Splash screen transitions to an Onboarding flow for new users.
2. **Authentication**: Users log in or sign up (simulated auth).
3. **Discovery**: Users browse the home screen (promotions, categories, popular items) or search the menu.
4. **Selection**: Users view product details, configure variants (e.g., cone type, sugar level), and add to cart.
5. **Conversion**: Users review the cart, select delivery/pickup options, choose a payment method, and complete the order.
6. **Fulfillment**: Users view the success screen and track their simulated order in real-time.

---

## 2. Screen Breakdown

Based on the provided design system, the application consists of the following screens:

### 1. Splash Screen
- **Purpose**: Brand introduction during app load.
- **UI Elements**: Solid primary red background (`#E60023`), white Mixue logo.
- **Interactions**: Auto-redirects to Onboarding (if first time) or Home/Login after 2 seconds.

### 2. Onboarding (3 Screens)
- **Purpose**: Highlight key value propositions.
- **UI Elements**: Carousel with mascot illustrations, Heading 2 title, Body 1 description, pagination dots, "Skip" button (top right), "Next"/"Get Started" primary button.
- **Interactions**: Swipeable carousel, Next button advances slide, Get Started finishes onboarding.

### 3. Login / Register
- **Purpose**: User authentication (Simulated).
- **UI Elements**: Top logo, "Welcome Back!" greeting, Inputs (Phone/Email, Password with toggle visibility), Primary "Login" button, "Continue with Google" secondary button, Sign Up text link.
- **Interactions**: Form validation, simulated login redirect.

### 4. Home
- **Purpose**: Main hub for discovery.
- **UI Elements**: Delivery location header with notification bell, Search bar, Promo banner carousel, Category quick links (horizontal scroll), "Popular Menu" section (horizontal scroll cards), "Recommended for You" section (vertical list), Bottom Navigation.
- **Layout**: Sticky header and bottom nav, scrollable content area.

### 5. Category / Menu
- **Purpose**: Browse all products by category.
- **UI Elements**: Header (Back button, Title, Search icon), Category chips (All, Ice Cream, Sundae, etc. - horizontal scroll), Vertical list of horizontal product cards with `+` add buttons.

### 6. Product Detail
- **Purpose**: View item details and configure before adding to cart.
- **UI Elements**: Large hero image, sticky top bar (Back, Favorite icons over image), Product title, price, rating/reviews, description. Variant selectors (e.g., "Choose Cone" chips). Quantity selector (`- 1 +`). Sticky bottom bar with "Add to Cart" button including total price.
- **Interactions**: Selecting variants updates the total price on the add to cart button.

### 7. My Cart
- **Purpose**: Review selected items.
- **UI Elements**: Header (Back, "My Cart", "Edit" action), List of CartItems (image, title, variants, qty controls, price), "Add Note" input, Cost breakdown (Subtotal, Delivery Fee, Total). Sticky bottom "Checkout" button.

### 8. Checkout
- **Purpose**: Finalize order details.
- **UI Elements**: Delivery Method toggle (Delivery / Pickup), Delivery Address card with "Change" link, Payment Method summary card, Cost summary. Sticky "Continue" button.

### 9. Payment
- **Purpose**: Select payment processor.
- **UI Elements**: Radio list of payment methods (Cash on Delivery, OVO, GoPay, DANA, ShopeePay, Credit/Debit Card). Apply Voucher input field. Sticky "Pay Now" button with total.

### 10. Order Success
- **Purpose**: Confirmation state.
- **UI Elements**: Large success checkmark, "Order Success!" text, Order ID, Estimated Time. "Track Order" primary button, "Back to Home" ghost button.

### 11. Order Tracking
- **Purpose**: Monitor order status (Simulated timeline).
- **UI Elements**: Header, Map view showing route, Order ID and ETA summary, Vertical stepper/timeline for order status (Order Received, Preparing, On The Way, Delivered).

### 12. Profile
- **Purpose**: Account management.
- **UI Elements**: User profile card (avatar, name, phone), Stats row (My Points, Vouchers), List menu (My Orders, Favorites, Addresses, Payment Methods, Promo, Settings, Help, Logout). Bottom Navigation.

---

## 3. Routing Structure (React Router)

The app will use a standard client-side routing setup with `react-router-dom`.

| Route | Component | Access | Layout |
|-------|-----------|--------|--------|
| `/` | `Splash` -> `Onboarding` | Public | Full Screen |
| `/auth/login` | `Login` | Public | AuthLayout |
| `/auth/register` | `Register` | Public | AuthLayout |
| `/home` | `Home` | Protected | AppLayout (w/ BottomNav) |
| `/menu` | `Menu` | Protected | AppLayout (w/ BottomNav) |
| `/product/:id` | `ProductDetail` | Protected | Full Screen |
| `/cart` | `Cart` | Protected | Full Screen |
| `/checkout` | `Checkout` | Protected | Full Screen |
| `/payment` | `Payment` | Protected | Full Screen |
| `/success` | `OrderSuccess` | Protected | Full Screen |
| `/tracking/:id` | `OrderTracking` | Protected | Full Screen |
| `/profile` | `Profile` | Protected | AppLayout (w/ BottomNav) |

---

## 4. Component Architecture (Simplified)

To avoid overengineering, we will stick to flat, straightforward component structures.

### A. Base UI Components
- `Button`, `Input`, `Card`, `Chip`, `Badge`.

### B. Feature Components
- `ProductCard`, `CartItem`, `BottomNav`.

### C. Layout Components
- `AppLayout` (with BottomNav), `PageContainer`.

---

## 5. State Management (Zustand)

Zustand provides a simple, unopinionated way to manage state without heavy boilerplate.

### `useCartStore`
- **State**: `items: CartItem[]`
- **Actions**: `addItem`, `removeItem`, `updateQuantity`, `clearCart`

### `useUserStore`
- **State**: `user: User | null`, `isAuthenticated: boolean`.
- **Actions**: `login()`, `logout()`.

---

## 6. Data Structure (TypeScript)

Strict typing for all core entities.

```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number; // For discounts
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  description: string;
  variants?: VariantGroup[];
  badges?: ('PROMO' | 'NEW' | 'BEST SELLER')[];
}

interface VariantGroup {
  name: string; // e.g., "Choose Cone"
  options: VariantOption[];
}

interface VariantOption {
  id: string;
  name: string; // e.g., "Waffle Cone"
  priceModifier: number; // e.g., +2000
}

interface CartItem {
  id: string; // Unique ID for cart entry (hash of productId + variants)
  productId: string;
  productName: string;
  productImage: string;
  basePrice: number;
  selectedVariants: Record<string, VariantOption>;
  quantity: number;
  note?: string;
  totalItemPrice: number;
}
```

---

## 7. Folder Structure (Flat & Direct)

```text
src/
├── assets/            # Static images, SVGs, global CSS
├── components/        # All reusable UI components (Button, Card, etc)
├── data/              # ALL MOCK DATA LIVES HERE (mockProducts.ts, etc)
├── pages/             # Route entry components (Home, Cart, Checkout, etc)
├── router/            # React Router configuration
├── store/             # Zustand stores
├── types/             # Global TypeScript definitions
├── App.tsx            # Root component
└── main.tsx           # Entry point
```
*(Removed heavy feature-folder abstractions to prioritize speed and clarity).*

---

## 8. Styling System (Tailwind CSS) & Pixel-Perfect Rules

**CRITICAL RULE:** All UI must match the provided design image pixel-accurately. Spacing, typography, and layout must NOT be approximated.

**Color Palette:**
- Primary: `#E60023`
- Text Dark: `#333333`
- Text Light: `#999999`
- Background Light: `#F5F5F5`
- White: `#FFFFFF`

**Typography (Poppins):**
- Heading 1: `24px Bold` (font-weight: 700)
- Heading 2: `18px SemiBold` (font-weight: 600)
- Heading 3: `16px Medium` (font-weight: 500)
- Body 1: `14px Regular` (font-weight: 400)
- Caption: `12px Regular` (font-weight: 400)

**Implementation Guidelines for Pixel Perfection:**
1. **Mobile Container Rule:** All screens must be constrained to a mobile viewport (`max-width: 480px`) and centered horizontally on desktop screens.
2. Hardcode specific Tailwind spacing extensions if standard spacing doesn't exactly match the design.
3. Ensure exact box shadows matching the design's soft elevation.
4. Corner radii must be exact.

---

## 9. PWA Configuration

Using `vite-plugin-pwa` to generate the manifest and service worker.

**manifest.json:**
- `name`: "Mixue Mobile"
- `short_name`: "Mixue"
- `theme_color`: "#E60023"
- `background_color`: "#FFFFFF"
- `display`: "standalone"

---

## 10. Development Phase Plan

**Phase 1: Foundation & Setup**
- Initialize Vite React TS project.
- Configure precise Tailwind typography and color tokens.
- Set up React Router and simplified folder structure.
- Build mock data architecture (`src/data/`).

**Phase 2: Core Components & Layouts**
- Build pixel-perfect base UI components (Button, Input, Typography, Card, Chip).
- Build AppLayout and Bottom Navigation.

**Phase 3: Screens - Auth & Discovery**
- Implement Splash, Onboarding, Login/Register.
- Implement Home and Menu screens perfectly matching layout.

**Phase 4: Screens - Shopping Flow**
- Implement Product Detail.
- Implement Cart state logic (Zustand) and Cart screen.
- Implement Checkout and Payment simulation screens.

**Phase 5: Polish & PWA**
- Implement Order Success and Tracking simulation.
- Profile screen.
- Final visual QA against the design image to ensure zero approximation.
- Configure PWA.


