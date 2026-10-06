import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '@/types/store';
import { toast } from 'sonner';

interface ShopContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discount: number;
  appliedPromo: string | null;
  shippingFee: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: string, color: string, quantity?: number) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;

  // Wishlist
  wishlist: string[];
  wishlistCount: number;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;

  // Modals & Drawers
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;

  // Orders
  lastOrder: OrderDetails | null;
  createOrder: (order: Omit<OrderDetails, 'orderId' | 'createdAt'>) => OrderDetails;
  openWhatsAppConcierge: (message?: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 500;
const STANDARD_SHIPPING = 35;

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ct_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem('ct_promo') || null;
    } catch {
      return null;
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ct_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(() => {
    try {
      const saved = localStorage.getItem('ct_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persistence effects
  useEffect(() => {
    try {
      localStorage.setItem('ct_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('ct_promo', appliedPromo);
      } else {
        localStorage.removeItem('ct_promo');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedPromo]);

  useEffect(() => {
    try {
      localStorage.setItem('ct_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Derived cart calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  let discount = 0;
  if (appliedPromo === 'COUTURE10') {
    discount = Math.round(cartSubtotal * 0.1);
  } else if (appliedPromo === 'PRIVELUXE') {
    discount = Math.min(100, cartSubtotal);
  } else if (appliedPromo === 'FREESHIP') {
    discount = 0;
  }

  const shippingFee =
    appliedPromo === 'FREESHIP' || cartSubtotal >= FREE_SHIPPING_THRESHOLD || cartSubtotal === 0
      ? 0
      : STANDARD_SHIPPING;

  const cartTotal = Math.max(0, cartSubtotal - discount + shippingFee);

  const addToCart = (product: Product, size: string, color: string, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: itemId, product, size, color, quantity }];
    });

    toast.success(`Added to your shopping bag`, {
      description: `${product.name} — Size ${size} in ${color}`,
      action: {
        label: 'View Bag',
        onClick: () => setIsCartOpen(true)
      }
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    toast.info('Item removed from bag');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const formatted = code.trim().toUpperCase();
    if (formatted === 'COUTURE10') {
      setAppliedPromo('COUTURE10');
      toast.success('Promo applied: 10% privilege discount!');
      return true;
    }
    if (formatted === 'PRIVELUXE') {
      setAppliedPromo('PRIVELUXE');
      toast.success('Promo applied: $100 off your atelier order!');
      return true;
    }
    if (formatted === 'FREESHIP') {
      setAppliedPromo('FREESHIP');
      toast.success('Promo applied: Complimentary Express Courier delivery!');
      return true;
    }

    toast.error('Invalid promotion code. Try COUTURE10 or PRIVELUXE');
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    toast.info('Promotion code removed');
  };

  // Wishlist methods
  const toggleWishlist = (product: Product) => {
    const exists = wishlist.includes(product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((id) => id !== product.id));
      toast.info(`Removed from your wishlist`, {
        description: product.name
      });
    } else {
      setWishlist((prev) => [...prev, product.id]);
      toast.success(`Saved to your wishlist`, {
        description: product.name,
        action: {
          label: 'View Wishlist',
          onClick: () => setIsWishlistOpen(true)
        }
      });
    }
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Orders
  const createOrder = (orderData: Omit<OrderDetails, 'orderId' | 'createdAt'>): OrderDetails => {
    const orderNumber = `CT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullOrder: OrderDetails = {
      ...orderData,
      orderId: orderNumber,
      createdAt: new Date().toISOString()
    };

    setLastOrder(fullOrder);
    try {
      localStorage.setItem('ct_last_order', JSON.stringify(fullOrder));
    } catch (e) {
      console.error(e);
    }

    clearCart();
    return fullOrder;
  };

  const openWhatsAppConcierge = (customMessage?: string) => {
    const defaultMsg =
      'Hello CT Collections Concierge, I would like bespoke styling advice and order assistance.';
    const text = encodeURIComponent(customMessage || defaultMsg);
    const whatsappUrl = `https://wa.me/2347048199203?text=${text}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discount,
        appliedPromo,
        shippingFee,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
        wishlist,
        wishlistCount: wishlist.length,
        isWishlistOpen,
        setIsWishlistOpen,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastOrder,
        createOrder,
        openWhatsAppConcierge
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
