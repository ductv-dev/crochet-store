"use client";

import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { RadioGroup, RadioGroupItem } from "@workspace/ui/components/radio-group"; // Need RadioGroup
import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";

export const CheckoutPage = () => {
  const { items, cartTotal, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        setIsSuccess(true);
        clearCart();
        toast.success("Order placed successfully!");
    }, 1500);
  };

  if (isSuccess) {
      return (
          <div className="container mx-auto px-4 py-20 max-w-lg text-center">
              <div className="flex justify-center mb-6">
                  <CheckCircle2 className="h-20 w-20 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
              <p className="text-muted-foreground mb-8">
                  Thank you for your purchase. Your order #ORD-{Math.floor(Math.random() * 10000)} has been received.
              </p>
              <Button asChild size="lg">
                  <Link href="/shop">Continue Shopping</Link>
              </Button>
          </div>
      );
  }

  if (items.length === 0) {
      return (
          <div className="container mx-auto px-4 py-20 text-center">
              <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
               <Button asChild>
                  <Link href="/shop">Go to Shop</Link>
              </Button>
          </div>
      );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-8">
          {/* Form */}
          <div className="md:col-span-2">
              <Card>
                  <CardHeader>
                      <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="firstName">First Name</Label>
                                  <Input id="firstName" required placeholder="John" />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="lastName">Last Name</Label>
                                  <Input id="lastName" required placeholder="Doe" />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input id="email" type="email" required placeholder="john@example.com" />
                          </div>
                           <div className="space-y-2">
                              <Label htmlFor="phone">Phone</Label>
                              <Input id="phone" type="tel" required placeholder="0912345678" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="address">Address</Label>
                              <Input id="address" required placeholder="123 Street Name" />
                          </div>
                           <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                  <Label htmlFor="city">City</Label>
                                  <Input id="city" required />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="zip">Zip Code</Label>
                                  <Input id="zip" required />
                              </div>
                          </div>
                      </form>
                  </CardContent>
              </Card>

               <Card className="mt-8">
                  <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent>
                      {/* Would need RadioGroup component installed */}
                      <div className="space-y-2">
                          <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <input type="radio" id="cod" name="payment" value="cod" defaultChecked className="h-4 w-4" />
                                <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                          </div>
                           <div className="flex items-center space-x-2 border p-4 rounded-md">
                                <input type="radio" id="bank" name="payment" value="bank" className="h-4 w-4" />
                                <Label htmlFor="bank">Bank Transfer</Label>
                          </div>
                      </div>
                  </CardContent>
              </Card>
          </div>

          {/* Summary */}
          <div>
               <Card>
                  <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="space-y-4 max-h-[300px] overflow-auto pr-2">
                          {items.map(item => (
                              <div key={item.id} className="flex gap-4">
                                  <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                                      <Image src={item.images?.[0] || "/placeholder.png"} fill alt={item.name} className="object-cover" />
                                  </div>
                                  <div className="flex-1 text-sm">
                                      <p className="font-medium line-clamp-2">{item.name}</p>
                                      <p className="text-muted-foreground">{item.quantity} x {formatPrice(item.price)}</p>
                                  </div>
                                  <div className="font-medium text-sm">
                                      {formatPrice(item.price * item.quantity)}
                                  </div>
                              </div>
                          ))}
                      </div>
                      <Separator />
                      <div className="space-y-1.5 text-sm">
                          <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span>{formatPrice(cartTotal)}</span>
                          </div>
                          <div className="flex justify-between">
                              <span>Shipping</span>
                              <span>Free</span>
                          </div>
                           <div className="flex justify-between font-bold text-lg pt-2">
                              <span>Total</span>
                              <span className="text-primary">{formatPrice(cartTotal)}</span>
                          </div>
                      </div>
                  </CardContent>
                  <CardFooter>
                      <Button className="w-full" size="lg" type="submit" form="checkout-form" disabled={loading}>
                          {loading ? "Processing..." : "Place Order"}
                      </Button>
                  </CardFooter>
               </Card>
          </div>
      </div>
    </div>
  );
};
