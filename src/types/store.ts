export type ProductCategory =
  | 'All'
  | 'Evening Wear'
  | 'Blazers & Suiting'
  | 'Silk & Satin'
  | 'Outerwear'
  | 'Knitwear & Tops';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  details: string[];
  fabric: string;
  care: string;
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stockStatus: 'in-stock' | 'low-stock' | 'made-to-order';
  stockCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  completeTheLookIds?: string[];
  relatedProductIds?: string[];
}

export interface CartItem {
  id: string; // unique item key: productId-size-color
  product: Product;
  size: string;
  color: string;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    notes?: string;
  };
  paymentMethod: string;
}
