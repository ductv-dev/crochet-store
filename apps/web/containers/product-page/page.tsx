"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/types";
import { getProductById, getProducts } from "@/services/product-service";
import { Button } from "@workspace/ui/components/button";
import { Badge } from "@workspace/ui/components/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { toast } from "sonner";
import { Minus, Plus, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import { ProductCard } from "@/components/shared/product-card";

interface ProductPageProps {
  productId: number;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  const { addItem, setIsOpen } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const p = await getProductById(productId);
        setProduct(p || null);

        if (p) {
            // Mock related products by category or just some items
            const result = await getProducts({ categoryId: p.categoryId, limit: 4 });
            setRelatedProducts(result.items.filter(item => item.id !== p.id));
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      toast.success(`Added ${quantity} x ${product.name} to cart`);
      // setIsOpen(true); // Optional: auto open cart
    }
  };

  if (loading) {
     return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <div className="space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-10 w-1/3" />
                </div>
            </div>
        </div>
     );
  }

  if (!product) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button variant="outline" onClick={() => window.history.back()}>Go Back</Button>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
         {/* Gallery */}
         <div className="space-y-4">
             <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
                 <Image
                    src={product.images?.[0] || "/placeholder.png"}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                 />
             </div>
             {/* Thumbnail list could go here */}
         </div>

         {/* Info */}
         <div className="space-y-6">
            <div>
                 <Badge variant="secondary" className="mb-2">{product.category?.name || "Handmade"}</Badge>
                 <h1 className="text-3xl font-bold">{product.name}</h1>
                 <div className="flex items-center gap-4 mt-2">
                     <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                     {product.originalPrice && (
                         <span className="text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                     )}
                 </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
                {product.description}
            </p>

            <div className="space-y-4 pt-4 border-t">
                 <div className="flex items-center gap-4">
                      <div className="flex items-center border rounded-md">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                          >
                             <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium">{quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            disabled={quantity >= product.stock}
                          >
                             <Plus className="h-4 w-4" />
                          </Button>
                      </div>
                      <span className="text-sm text-muted-foreground">
                          {product.stock} items available
                      </span>
                 </div>

                 <div className="flex gap-4">
                     <Button 
                        size="lg" 
                        className="flex-1 gap-2" 
                        onClick={handleAddToCart}
                        disabled={product.stock === 0}
                     >
                         <ShoppingCart className="h-5 w-5" />
                         Add to Cart
                     </Button>
                     {/* Buy Now could be added */}
                 </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" />
                    <span>Free shipping over 500k</span>
                </div>
                <div className="flex items-center gap-2">
                     <ShieldCheck className="h-5 w-5 text-primary" />
                     <span>Secure payment</span>
                </div>
            </div>
         </div>
      </div>

      {/* Tabs */}
      <div className="mb-16">
         <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent p-0 mb-6">
                 <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3">Description</TabsTrigger>
                 <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3">Care Instructions</TabsTrigger>
                 <TabsTrigger value="shipping" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-8 py-3">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="prose max-w-none text-muted-foreground">
                <p>
                    Every stitch of this {product.name.toLowerCase()} is crafted with care and precision. 
                    Using high-quality materials, we ensure durability and comfort. 
                    Perfect as a gift for yourself or a loved one.
                </p>
            </TabsContent>
            <TabsContent value="care" className="prose max-w-none text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                    <li>Hand wash gently with cold water.</li>
                    <li>Do not bleach.</li>
                    <li>Lay flat to dry, do not tumble dry.</li>
                    <li>Store in a cool, dry place.</li>
                </ul>
            </TabsContent>
            <TabsContent value="shipping" className="prose max-w-none text-muted-foreground">
                <p>
                    We ship locally within 2-3 business days. 
                    Carefully packaged to ensure it arrives in perfect condition.
                </p>
            </TabsContent>
         </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
          <section>
              <h2 className="text-2xl font-bold mb-6">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map(p => (
                      <ProductCard key={p.id} product={p} />
                  ))}
              </div>
          </section>
      )}
    </div>
  );
};
