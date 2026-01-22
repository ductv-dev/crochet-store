"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types";
import { getProducts } from "@/services/product-service";
import { ProductCard } from "@/components/shared/product-card";
import { FiltersSidebar } from "@/components/feature/shop/filters-sidebar";
import { SortSelect } from "@/components/feature/shop/sort-select";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { Filter } from "lucide-react";

export const ShopPage = () => {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const result = await getProducts({
          search: searchParams.get("search") || undefined,
          categoryId: searchParams.get("categoryId") ? Number(searchParams.get("categoryId")) : undefined,
          minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
          maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
          inStock: searchParams.get("inStock") === "true",
          sort: (searchParams.get("sort") as any) || "newest",
        });
        setProducts(result.items);
        setTotal(result.total);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 flex-shrink-0">
           <FiltersSidebar />
        </div>

        {/* Mobile Sidebar & Main Content */}
        <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Shop ({total})</h1>
                <div className="flex items-center gap-2">
                    {/* Mobile Filter Sheet */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filter
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left">
                                <FiltersSidebar />
                            </SheetContent>
                        </Sheet>
                    </div>
                    <SortSelect />
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="aspect-square w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                     <h2 className="text-xl font-semibold mb-2">No products found</h2>
                     <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
