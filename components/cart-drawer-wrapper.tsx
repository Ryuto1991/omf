"use client"

import dynamic from "next/dynamic"

// カートドロワーを動的にインポート（クライアントサイドのみでレンダリング）
const CartDrawer = dynamic(() => import("@/components/cart-drawer"), { ssr: false })

export function CartDrawerWrapper() {
  return <CartDrawer />
}

