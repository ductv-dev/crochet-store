export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  categoryId: number;
  rating: number;
  reviews: number;
  tags: string[];
  createdAt: string;
  category?: Category;
}

export interface CartItem extends Product {
  quantity: number;
}
