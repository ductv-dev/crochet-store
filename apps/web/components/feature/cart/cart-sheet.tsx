"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Button } from "@workspace/ui/components/button";
import { ScrollArea } from "@workspace/ui/components/scroll-area"; // Need to install scroll-area or use div
import { Separator } from "@workspace/ui/components/separator";
import { ShoppingBag } from "lucide-react";
import { CartItem } from "./cart-item";

export const CartSheet = () => {
  const { items, isOpen, setIsOpen, cartTotal } = useCart();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart ({items.length})</SheetTitle>
          <SheetDescription>
             Review your items and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        
        {items.length > 0 ? (
            <>
                {/* Use div overflow-auto if scroll-area not available yet, but better to install scroll-area */}
                <div className="flex-1 overflow-y-auto px-1 pr-8 -mr-6"> 
                    <div className="flex flex-col divide-y">
                        {items.map((item) => (
                             <CartItem key={item.id} item={item} />
                        ))}
                    </div>
                </div>
                 <div className="space-y-4 pr-6 pb-6 pt-4">
                    <Separator />
                    <div className="space-y-1.5">
                        <div className="flex">
                            <span className="flex-1">Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="flex">
                            <span className="flex-1 font-bold">Total</span>
                            <span className="font-bold text-primary text-xl">{formatPrice(cartTotal)}</span>
                        </div>
                    </div>
                    <SheetFooter>
                        <Button className="w-full" asChild>
                            <Link href="/checkout" onClick={() => setIsOpen(false)}>
                                Checkout
                            </Link>
                        </Button>
                    </SheetFooter>
                </div>
            </>
        ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-2 pr-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                     <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold">Your cart is empty</h3>
                <p className="text-muted-foreground text-center max-w-xs">
                    Looks like you haven't added any crochet items to your cart yet.
                </p>
                <Button className="mt-4" onClick={() => setIsOpen(false)} asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
