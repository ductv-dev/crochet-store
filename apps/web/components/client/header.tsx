"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoCrocket } from "../logo";
import { Button } from "@workspace/ui/components/button";
import { User, ShoppingBag, Home, Info, Phone, Store } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Badge } from "@workspace/ui/components/badge";

import { useAuth } from "@/context/auth-context";

export const HeaderClient = () => {
  const pathname = usePathname();
  const { cartCount, setIsOpen } = useCart();
  const { isLogin } = useAuth();

  const DATA_HEADER = [
    {
      id: 1,
      name: "Home",
      href: "/",
      icon: Home,
    },
    {
      id: 2,
      name: "Shop",
      href: "/shop",
      icon: Store,
    },
    {
      id: 3,
      name: "About",
      href: "/about",
      icon: Info,
    },
    {
      id: 4,
      name: "Contact",
      href: "/contact",
      icon: Phone,
    },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10">
                <LogoCrocket color="#643A79" className="h-full w-full" />
              </div>
              <span className="text-xl font-bold hidden sm:inline-block">Crocket Store</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {DATA_HEADER.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex"
                aria-label="Shopping Cart"
                onClick={() => setIsOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge variant="destructive" className="text-white absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                    {cartCount}
                  </Badge>
                )}
              </Button>
              <Link href={isLogin ? "/profile" : "/login"}>
                <Button variant="ghost" size="icon" aria-label={isLogin ? "Account" : "Login"}>
                  <User className={`h-5 w-5 ${isLogin ? "text-primary fill-primary/20" : ""}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t pb-safe">
        <nav className="flex items-center justify-around h-16">
          {DATA_HEADER.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors ${pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          ))}
          {/* Mobile Cart Button in Bottom Test */}
          <button
            className="flex flex-col items-center justify-center w-full h-full gap-1 text-xs font-medium transition-colors text-muted-foreground hover:text-primary"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge variant="destructive" className="text-white absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px]">
                  {cartCount}
                </Badge>
              )}
            </div>
            <span>Cart</span>
          </button>
        </nav>
      </div>
    </>
  );
};
