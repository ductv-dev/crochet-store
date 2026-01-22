import { PRODUCTS } from "../data/products";
import { CATEGORIES } from "../data/categories";
import { Product } from "../types";

const SIMULATE_DELAY = 500; // ms

interface GetProductsParams {
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  sort?: "newest" | "price_asc" | "price_desc" | "name_asc";
  page?: number;
  limit?: number;
}

export const getProducts = async (
  params: GetProductsParams = {}
): Promise<{ items: Product[]; total: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let filtered = [...PRODUCTS];

      // Filtering
      if (params.search) {
        const lowerSearch = params.search.toLowerCase();
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(lowerSearch)
        );
      }

      if (params.categoryId) {
        filtered = filtered.filter((p) => p.categoryId === params.categoryId);
      }

      if (params.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= params.minPrice!);
      }

      if (params.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= params.maxPrice!);
      }

      if (params.inStock) {
        filtered = filtered.filter((p) => p.stock > 0);
      }

      // Sorting
      if (params.sort) {
        switch (params.sort) {
          case "newest":
            filtered.sort(
              (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
          case "price_asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price_desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "name_asc":
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        }
      }

      // Pagination
      const page = params.page || 1;
      const limit = params.limit || 100;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      
      const items = filtered.slice(startIndex, endIndex).map(p => ({
        ...p,
        category: CATEGORIES.find(c => c.id === p.categoryId)
      }));

      resolve({
        items,
        total: filtered.length,
      });
    }, SIMULATE_DELAY);
  });
};

export const getProductById = async (id: number): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = PRODUCTS.find((p) => p.id === id);
      if (product) {
        resolve({
          ...product,
          category: CATEGORIES.find((c) => c.id === product.categoryId),
        });
      } else {
        resolve(undefined);
      }
    }, SIMULATE_DELAY);
  });
};
