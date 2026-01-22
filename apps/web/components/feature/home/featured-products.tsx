"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@workspace/ui/components/skeleton";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch "Featured" (simulated by limiting)
        const result = await getProducts({ limit: 4, sort: "price_desc" }); 
        setProducts(result.items);
      } catch (error) {
        console.error("Failed to fetch featured products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-12 md:py-24">
         <div className="container max-w-7xl mx-auto px-4 md:px-6">
             <div className="flex flex-col items-center text-center mb-12">
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Collections</h2>
                 <p className="text-muted-foreground mt-2 max-w-[600px]">
                     Our most popular handcrafted items, loved by our customers.
                 </p>
             </div>
             
             {loading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {Array.from({ length: 4 }).map((_, i) => (
                           <div key={i} className="space-y-3">
                                <Skeleton className="h-[300px] w-full rounded-xl" />
                                <Skeleton className="h-4 w-2/3" />
                                <Skeleton className="h-4 w-1/3" />
                           </div>
                      ))}
                 </div>
             ) : (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {products.map(product => (
                         <ProductCard key={product.id} product={product} />
                     ))}
                 </div>
             )}
         </div>
    </section>
  );
};
