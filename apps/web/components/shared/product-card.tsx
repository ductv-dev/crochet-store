"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Card, CardContent, CardFooter } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if clicking the button inside a link
    addItem(product);
    toast.success(`Added ${product.name} to cart`);
  };

  return (
    <Card className="group overflow-hidden border-none shadow-sm transition-all hover:shadow-md">
      <Link href={`/shop/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.images?.[0] || "/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {product.stock === 0 && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Badge variant="destructive" className="text-lg">Out of Stock</Badge>
             </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
             <Badge variant="secondary" className="absolute top-2 left-2">Only {product.stock} left!</Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex flex-col gap-2 mb-2">
            <Link href={`/shop?categoryId=${product.categoryId}`} className="text-xs text-muted-foreground hover:text-primary w-fit relative z-20">
                {product.category?.name || `Category ${product.categoryId}`}
            </Link>
            <Link href={`/shop/${product.id}`} className="font-semibold hover:text-primary line-clamp-2 h-10 leading-5 block relative z-20" title={product.name}>
                {product.name}
            </Link>
            
            <div className="flex items-center gap-2 mt-1">
                <div className="font-bold text-primary">{formatPrice(product.price)}</div>
                {product.originalPrice && (
                    <div className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</div>
                )}
            </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
            className="w-full gap-2 relative z-20" 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
