"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { Skeleton } from "@workspace/ui/components/skeleton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@workspace/ui/components/carousel";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch "Featured" (simulated by limiting)
        const result = await getProducts({ limit: 8, sort: "price_desc" }); 
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
             <div className="flex flex-col items-center text-center mb-8 md:mb-12">
                 <h2 className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl">Featured Collections</h2>
                 <p className="text-muted-foreground mt-2 max-w-[600px] text-sm md:text-base">
                     Our most popular handcrafted items, loved by our customers.
                 </p>
             </div>
             
             <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
             >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, i) => (
                             <CarouselItem key={i} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                                   <div className="space-y-3">
                                        <Skeleton className="h-[250px] md:h-[300px] w-full rounded-xl" />
                                        <Skeleton className="h-4 w-2/3" />
                                        <Skeleton className="h-4 w-1/3" />
                                   </div>
                             </CarouselItem>
                        ))
                    ) : (
                        products.map(product => (
                            <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                               <ProductCard product={product} />
                            </CarouselItem>
                        ))
                    )}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-12" />
                <CarouselNext className="hidden md:flex -right-12" />
             </Carousel>
         </div>
    </section>
  );
};
