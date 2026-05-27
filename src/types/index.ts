export interface Product {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  description: {
    en: string;
    ar: string;
  };
  price: number;
  category: 'dried-flowers' | 'bouquets' | 'engagement' | 'wedding' | 'valentine';
  image: string;
  images?: string[];
  featured?: boolean;
  badge?: {
    en: string;
    ar: string;
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'ar';

export interface Category {
  id: string;
  name: {
    en: string;
    ar: string;
  };
  image: string;
  count: number;
}
