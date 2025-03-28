"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"

export default function CartButton() {
  const { totalItems, setIsCartOpen } = useCart()

  return (
    <Button
      variant="ghost"
      className="relative p-2 hover:bg-transparent"
      onClick={() => setIsCartOpen(true)}
      aria-label="カートを開く"
    >
      <ShoppingBag className="h-5 w-5 text-secondary-foreground" />
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )}
    </Button>
  )
}

