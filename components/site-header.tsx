"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Instagram, Twitter, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"
import CartButton from "@/components/cart-button"

// goToHomePageメソッドを追加
export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  useState(() => {
    setIsMounted(true)
  }, [])

  // トップページに移動してスクロールトップする関数
  const goToHomePage = () => {
    router.push("/")
    // 少し遅延させてからスクロールトップを実行
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto",
      })
    }, 100)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error("ログアウトエラー:", error)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-secondary z-50">
      <div className="container mx-auto px-4 md:px-8 py-6 flex items-center justify-between">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Linkコンポーネントをdivに変更し、onClick属性を追加 */}
          <div
            onClick={goToHomePage}
            className="text-2xl font-medium text-secondary-foreground font-zen cursor-pointer"
          >
            <div className="flex flex-col">
              <span className="text-2xl">Oh my</span>
              <span className="text-2xl -mt-1">fragrance</span>
            </div>
          </div>
        </motion.div>

        <motion.nav
          className="hidden md:flex items-center space-x-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            href="/AI-Blend"
            className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat"
          >
            AI Blend
          </Link>
          <Link
            href="/showcase"
            className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat"
          >
            Showcase
          </Link>
          <Link
            href="/select-fragrance"
            className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat"
          >
            Select Plan
          </Link>
          <Link
            href="/concept"
            className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat"
          >
            Concept
          </Link>
        </motion.nav>

        <motion.div
          className="hidden md:flex items-center space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* カートボタンを追加 */}
          <CartButton />

          {isMounted &&
            (user ? (
              <>
                <span className="text-sm text-secondary-foreground font-zen">{user.email?.split("@")[0]}さん</span>
                <Button
                  variant="outline"
                  className="rounded-full border-secondary-foreground hover:bg-secondary-foreground hover:text-white font-montserrat"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </Button>
              </>
            ) : (
              <>
                {/* ボタンの順序を入れ替え: 新規登録が左、ログインが右 */}
                <Link href="/signup">
                  <Button
                    variant="outline"
                    className="rounded-full border-secondary-foreground hover:bg-secondary-foreground hover:text-white font-montserrat"
                  >
                    新規登録
                  </Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-white rounded-full font-montserrat">
                    ログイン
                  </Button>
                </Link>
              </>
            ))}
          <Link href="/instagram" className="text-secondary-foreground hover:opacity-70 transition-opacity">
            <Instagram className="h-5 w-5" />
          </Link>
          <Link href="/twitter" className="text-secondary-foreground hover:opacity-70 transition-opacity">
            <Twitter className="h-5 w-5" />
          </Link>
        </motion.div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          <CartButton />
          <button
            onClick={toggleMobileMenu}
            className="text-secondary-foreground hover:opacity-70 transition-opacity"
            aria-label={mobileMenuOpen ? "メニューを閉じる" : "メニューを開く"}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          className="md:hidden bg-secondary py-4 px-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <nav className="flex flex-col space-y-4">
            <Link
              href="/AI-Blend"
              className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Blend
            </Link>
            <Link
              href="/showcase"
              className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Showcase
            </Link>
            <Link
              href="/select-fragrance"
              className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Select Plan
            </Link>
            <Link
              href="/concept"
              className="text-sm text-secondary-foreground hover:opacity-70 transition-opacity font-montserrat py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Concept
            </Link>
            <div className="flex space-x-4 pt-2">
              {user ? (
                <Button
                  onClick={() => {
                    handleSignOut()
                    setMobileMenuOpen(false)
                  }}
                  className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-montserrat"
                >
                  ログアウト
                </Button>
              ) : (
                <>
                  {/* モバイルメニューでもボタンの順序を入れ替え */}
                  <Link href="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-secondary-foreground hover:bg-secondary-foreground hover:text-white font-montserrat"
                    >
                      新規登録
                    </Button>
                  </Link>
                  <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full font-montserrat">
                      ログイン
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <div className="flex space-x-4 pt-2">
              <Link
                href="/instagram"
                className="text-secondary-foreground hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="/twitter"
                className="text-secondary-foreground hover:opacity-70 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  )
}

