"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// CartItem インターフェースに description フィールドを追加します
export interface CartItem {
  id: number
  title: string
  price: string
  image: string
  quantity: number
  slug: string
  category: string
  description?: string // 詳細情報のフィールドを追加
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: string
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // クライアントサイドでのみ実行されるようにする
  useEffect(() => {
    setMounted(true)
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (e) {
        console.error("カートの読み込みに失敗しました", e)
      }
    }
  }, [])

  // カートが更新されたらローカルストレージに保存
  useEffect(() => {
    if (mounted && items.length >= 0) {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items, mounted])

  const addToCart = (product: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)

      if (existingItem) {
        // 既存のアイテムの数量を増やす
        return prevItems.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        // 新しいアイテムを追加
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })

    // カートを開く
    setIsCartOpen(true)
  }

  const removeFromCart = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  // 合計アイテム数を計算
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  // 合計金額を計算（カンマ区切りの文字列から数値に変換して計算）
  const totalPrice = items
    .reduce((total, item) => {
      const price = Number.parseInt(item.price.replace(/,/g, ""), 10) || 0
      return total + price * item.quantity
    }, 0)
    .toLocaleString()

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// useCart フックを修正して、サーバーサイドレンダリング時のエラーを防ぐ
export function useCart() {
  const context = useContext(CartContext)
  if (typeof window === "undefined") {
    // サーバーサイドレンダリング時はダミーの値を返す
    return {
      items: [],
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      totalItems: 0,
      totalPrice: "0",
      isCartOpen: false,
      setIsCartOpen: () => {},
    }
  }

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

