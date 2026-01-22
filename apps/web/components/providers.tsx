"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { CartProvider } from "@/context/cart-context"
import { CartSheet } from "@/components/feature/cart/cart-sheet"
import { Toaster } from "sonner"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <CartProvider>
        {children}
        <CartSheet />
        <Toaster />
      </CartProvider>
    </NextThemesProvider>
  )
}
