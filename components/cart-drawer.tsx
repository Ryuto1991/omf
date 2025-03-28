"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"

export default function CartDrawer() {
  // クライアントサイドでのみレンダリングされるようにする
  const [isMounted, setIsMounted] = useState(false)
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, isCartOpen, setIsCartOpen } = useCart()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // ESCキーでカートを閉じる
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCartOpen(false)
      }
    }

    window.addEventListener("keydown", handleEsc)

    return () => {
      window.removeEventListener("keydown", handleEsc)
    }
  }, [setIsCartOpen])

  // カートが開いているときは背景のスクロールを無効にする
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isCartOpen])

  // サーバーサイドレンダリング時は何も表示しない
  if (!isMounted) return null

  return (
    <AnimatePresence mode="wait">
      {isCartOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
            onClick={() => setIsCartOpen(false)}
          />

          {/* カートドロワー */}
          <motion.div
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 shadow-xl flex flex-col"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-medium font-zen flex items-center">
                <ShoppingBag className="h-5 w-5 mr-2" />
                カート ({totalItems})
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="カートを閉じる"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-secondary-foreground/70 mb-4 font-zen">カートに商品がありません</p>
                  <Button
                    onClick={() => setIsCartOpen(false)}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full"
                  >
                    ショッピングを続ける
                  </Button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.id} className="border-b pb-4">
                      <div className="flex gap-4">
                        <div className="relative w-20 h-20 bg-secondary/30 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="text-sm font-medium font-zen">{item.title}</h3>
                              <p className="text-xs text-secondary-foreground/70 font-zen">{item.category}</p>

                              {/* 詳細情報を表示する部分を追加 */}
                              {item.description && (
                                <div className="mt-1 text-xs text-secondary-foreground/70 font-zen whitespace-pre-line">
                                  {item.description}
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500"
                              aria-label="商品を削除"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border rounded-full">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                aria-label="数量を減らす"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 hover:bg-gray-100 rounded-full"
                                aria-label="数量を増やす"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <p className="text-sm font-medium">
                              ¥{Number.parseInt(item.price.replace(/,/g, ""), 10).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between mb-4">
                  <span className="font-zen">小計</span>
                  <span className="font-medium">¥{totalPrice}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="font-zen">送料</span>
                  <span className="font-medium">¥550</span>
                </div>
                <div className="flex justify-between mb-6 text-lg font-medium">
                  <span className="font-zen">合計</span>
                  <span>¥{(Number.parseInt(totalPrice.replace(/,/g, ""), 10) + 550).toLocaleString()}</span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">レジに進む</Button>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-full text-center mt-4 text-sm text-primary hover:underline"
                >
                  ショッピングを続ける
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

