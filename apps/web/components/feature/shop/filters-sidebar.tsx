"use client";

import { CATEGORIES } from "@/data/categories";
import { Button } from "@workspace/ui/components/button";
import { Checkbox } from "@workspace/ui/components/checkbox";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Slider } from "@workspace/ui/components/slider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

export const FiltersSidebar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get("categoryId")
  );

  // Fix: Initialize price from URL
  const initialMinPrice = searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : 0;
  const initialMaxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : 2000000;
  const [priceRange, setPriceRange] = useState<[number, number]>([initialMinPrice, initialMaxPrice]);

  const [inStock, setInStock] = useState(searchParams.get("inStock") === "true");

  const debouncedPrice = useDebounce(priceRange, 500);

  // Sync state with URL (Search removed from here)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (selectedCategory) {
      params.set("categoryId", selectedCategory);
    } else {
      params.delete("categoryId");
    }

    const price = debouncedPrice || [0, 2000000];
    if (price[0] > 0 || price[1] < 2000000) {
      params.set("minPrice", price[0].toString());
      params.set("maxPrice", price[1].toString());
    } else {
      params.delete("minPrice");
      params.delete("maxPrice");
    }

    if (inStock) {
      params.set("inStock", "true");
    } else {
      params.delete("inStock");
    }

    // Only push if params actually changed to avoid redundant pushes (basic check)
    // For now, simpler to just push, but wrapped in useEffect dependency check
    // Note: We need to be careful not to overwrite 'search' param here if it exists in URL
    // Since we initialize `params` from `searchParams`, 'search' is preserved.

    // Check if current params match constructed params to avoid loop relative to these specific filters
    const currentParams = searchParams.toString();
    const newParams = params.toString();

    if (currentParams !== newParams) {
      router.push(`/shop?${newParams}`);
    }

  }, [selectedCategory, debouncedPrice, inStock]);

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 2000000]);
    setInStock(false);

    // Preserve search if any
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categoryId");
    params.delete("minPrice");
    params.delete("maxPrice");
    params.delete("inStock");

    router.push(`/shop?${params.toString()}`);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  return (
    <div className="space-y-6">
      {/* Search removed from here */}

      <div>
        <h3 className="mb-4 text-lg font-semibold">Categories</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="cat-all"
              checked={!selectedCategory}
              onCheckedChange={() => setSelectedCategory(null)}
            />
            <Label htmlFor="cat-all" className="cursor-pointer">All Categories</Label>
          </div>
          {CATEGORIES.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={selectedCategory === category.id.toString()}
                onCheckedChange={() => setSelectedCategory(category.id.toString())}
              />
              <Label htmlFor={`cat-${category.id}`} className="cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <Separator />
      <div>
        <h3 className="mb-4 text-lg font-semibold">Price Range</h3>
        <Slider
          defaultValue={[0, 2000000]}
          value={priceRange}
          max={2000000}
          step={50000}
          onValueChange={handlePriceChange}
          className="mb-4"
        />
        <div className="flex items-center justify-between text-sm">
          <span>{priceRange[0].toLocaleString()}đ</span>
          <span>{priceRange[1].toLocaleString()}đ</span>
        </div>
      </div>
      <Separator />
      <div className="flex items-center space-x-2">
        <Checkbox
          id="stock"
          checked={inStock}
          onCheckedChange={(checked) => setInStock(checked as boolean)}
        />
        <Label htmlFor="stock">In Stock Only</Label>
      </div>
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};
