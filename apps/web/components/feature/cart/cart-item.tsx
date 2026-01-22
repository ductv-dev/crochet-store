"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface CartItemProps {
  item: CartItemType;
}

export const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
             <Image
                src={item.images?.[0] || "/placeholder.png"}
                alt={item.name}
                fill
                className="object-cover"
            />
        </div>
        <div className="flex flex-1 flex-col">
            <div className="flex justify-between text-base font-medium">
                <h3 className="line-clamp-2 pr-4 text-sm">{item.name}</h3>
                <p className="ml-4">{formatPrice(item.price * item.quantity)}</p>
            </div>
             <p className="mt-1 text-xs text-muted-foreground">{formatPrice(item.price)} each</p>
            <div className="flex flex-1 items-end justify-between text-sm">
                <div className="flex items-center gap-2 border rounded-md p-1 h-8">
                     <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                     >
                        <Minus className="h-3 w-3" />
                     </Button>
                     <span className="w-4 text-center text-xs">{item.quantity}</span>
                     <Button 
                        variant="ghost" 
                        size="icon" 
                         className="h-6 w-6"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                     >
                        <Plus className="h-3 w-3" />
                     </Button>
                </div>

                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-auto p-0 text-destructive hover:bg-transparent hover:text-destructive/90"
                    onClick={() => removeItem(item.id)}
                >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Remove
                </Button>
            </div>
        </div>
    </div>
  );
};
