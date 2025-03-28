"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"

import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"

export default function ErinaGracePage() {
  const { addToCart } = useCart()

  // ページトップへのスクロール処理
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0)

      // 少し遅延させて再度スクロール（より確実にするため）
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 100)
    }
  }, [])

  const product = {
    id: 4,
    title: "Erina Grace",
    subtitle: "― 氷のプリンセス、その微笑みに隠された優しさ ―",
    description: "凛とした佇まいと、どこか儚げな微笑み。触れれば消えてしまいそうな透明感と、心に残る芯の強さ。",
    fullDescription: `凛とした佇まいと、どこか儚げな微笑み。
触れれば消えてしまいそうな透明感と、心に残る芯の強さ。
九条エリナをイメージして調香された、清楚で気高い香りです。

すれ違うたび、ふわりと広がる気品。
その香りはまるで、雪の朝に差し込む光のように澄み渡り、
やがてそっと寄り添うように、あなたの記憶に残ります。`,
    image: "/images/erina-grace.png",
    category: "コンテンツコラボ",
    slug: "erina-grace",
    price: "6,480",
    notes: {
      top: ["ホワイトピーチ", "ライチ"],
      middle: ["アイリス", "ローズ", "ジャスミン"],
      base: ["ムスク", "シダーウッド"],
    },
    duration: "4〜6時間",
    intensity: "やや強め",
    season: "オールシーズン",
    details: {
      title: "九条エリナ イメージフレグランス",
      subtitle: "『私たち、入籍しました。』メインヒロイン 九条エリナの香り",
      credits: "原作：一ノ瀬ゆう　イラスト：mitsuha",
      option: "✨オプション＋500円で透明シール加工を施しています✨",
      noteDescriptions: {
        top: "― 初対面の緊張感を和らげる、みずみずしい甘さ",
        middle: "― 凛とした美しさと内面の繊細さを重ねて",
        base: "― 冷たさの奥に潜む、やさしく包み込む余韻",
      },
    },
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      slug: product.slug,
      category: product.category,
    })
  }

  return (
    <div className="min-h-screen bg-secondary">
      <SiteHeader />

      <main className="pt-28 pb-20">
        {/* ヒーローセクション */}
        <section className="relative bg-gradient-to-r from-blue-50 to-indigo-50 py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200 via-transparent to-transparent"></div>
          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="mb-6">
              <Link href="/showcase">
                <Button
                  variant="outline"
                  className="rounded-full border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  制作事例に戻る
                </Button>
              </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="w-full md:w-1/2">
                <motion.h1
                  className="text-3xl md:text-4xl font-medium mb-4 text-gray-800 font-zen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {product.details.title}
                </motion.h1>
                <motion.p
                  className="text-gray-600 mb-6 font-zen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {product.details.subtitle}
                </motion.p>
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-8 shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-medium mb-4 text-gray-800 font-zen">{product.title}</h2>
                  <p className="text-gray-600 italic mb-4 font-zen">{product.subtitle}</p>
                  <p className="text-gray-600 mb-4 font-zen whitespace-pre-line">{product.fullDescription}</p>
                </motion.div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <motion.div
                  className="relative w-full max-w-md"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-full h-full relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      width={600}
                      height={600}
                      style={{ width: "100%", height: "100%", objectFit: "contain" }}
                      className="rounded-lg shadow-2xl"
                      loading="eager"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 詳細情報セクション */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-secondary-foreground font-zen">香りの構成</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-blue-800 font-zen">トップノート</h3>
                    <p className="text-secondary-foreground mb-2 font-zen">{product.notes.top.join("・")}</p>
                    <p className="text-secondary-foreground/70 text-sm font-zen">
                      {product.details.noteDescriptions.top}
                    </p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-purple-800 font-zen">ミドルノート</h3>
                    <p className="text-secondary-foreground mb-2 font-zen">{product.notes.middle.join("・")}</p>
                    <p className="text-secondary-foreground/70 text-sm font-zen">
                      {product.details.noteDescriptions.middle}
                    </p>
                  </div>
                  <div className="bg-indigo-50 p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-2 text-indigo-800 font-zen">ラストノート</h3>
                    <p className="text-secondary-foreground mb-2 font-zen">{product.notes.base.join("・")}</p>
                    <p className="text-secondary-foreground/70 text-sm font-zen">
                      {product.details.noteDescriptions.base}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-secondary-foreground font-zen">製品情報</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-secondary-foreground/70 mb-1 font-zen">価格</h3>
                      <p className="text-lg text-secondary-foreground font-zen">¥{product.price}（税込）</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary-foreground/70 mb-1 font-zen">持続時間</h3>
                      <p className="text-lg text-secondary-foreground font-zen">{product.duration}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary-foreground/70 mb-1 font-zen">香りの強さ</h3>
                      <p className="text-lg text-secondary-foreground font-zen">{product.intensity}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-secondary-foreground/70 mb-1 font-zen">オプション</h3>
                      <p className="text-lg text-secondary-foreground font-zen">{product.details.option}</p>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-sky-400 hover:bg-sky-500 text-white rounded-full py-3 font-montserrat relative overflow-hidden group"
                  >
                    <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    <span className="relative">カートに追加</span>
                  </Button>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-secondary-foreground font-zen">AIブレンド香水</h2>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-secondary-foreground mb-4 font-zen">
                    AIとの会話で、自分だけの"推し香水"や"マイボトル"がつくれます。
                    好みや気分に合わせて、世界にひとつだけの香りを一緒にデザインしてみませんか？
                  </p>
                  <p className="text-lg text-secondary-foreground font-zen mb-6">5,980円（税込）〜</p>
                  <Link href="/AI-Blend">
                    <Button className="bg-sky-400 hover:bg-sky-500 text-white rounded-full px-6 py-3 font-montserrat">
                      AIと香りをつくる
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mb-12">
                <h2 className="text-2xl font-medium mb-6 text-secondary-foreground font-zen">
                  小ロットでの香水制作も承ります
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <p className="text-secondary-foreground mb-4 font-zen">
                    この香水は「世界観を香りで表現する」プロジェクトの一環として開発されたケーススタディ作品です。
                  </p>
                  <p className="text-secondary-foreground mb-4 font-zen">
                    当ブランドでは、10本からの小ロット生産にも対応しており、アーティスト・クリエイター・ブランド様の世界観を香りとして形にするお手伝いをしています。
                  </p>
                  <p className="text-secondary-foreground mb-6 font-zen">
                    ご希望の方は、ぜひお問い合わせフォームよりご相談ください。
                  </p>
                  <Link href="/contact">
                    <Button className="bg-sky-400 hover:bg-sky-500 text-white rounded-full px-6 py-3 font-montserrat">
                      お問い合わせはこちら
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 関連商品セクション */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-8">
            <h2 className="text-2xl font-medium mb-8 text-center text-secondary-foreground font-zen">
              その他のコラボレーション香水
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Link href="/showcase/silent-pulse">
                  <div className="relative aspect-[3/4] bg-white flex items-center justify-center group">
                    <div className="w-full h-full relative">
                      <Image 
                        src="/images/silent-pulse.png" 
                        alt="Silent Pulse" 
                        fill 
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 text-secondary-foreground font-zen">Silent Pulse</h3>
                    <p className="text-sm text-secondary-foreground/70 mb-4 font-zen">
                      都会の夜に浮かぶ、孤独と希望のグラデーション。Re:Noirが紡ぐ繊細な旋律と感情を香りで再構成。
                    </p>
                    <div className="flex justify-end">
                      <span className="text-primary text-sm flex items-center font-montserrat">
                        詳細を見る
                        <ArrowLeft className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Link href="/showcase/bloom-whisper">
                  <div className="relative aspect-[3/4] bg-white flex items-center justify-center group">
                    <div className="w-full h-full relative">
                      <Image 
                        src="/images/bloom-whisper.png" 
                        alt="Bloom Whisper" 
                        fill 
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 text-secondary-foreground font-zen">Bloom Whisper</h3>
                    <p className="text-sm text-secondary-foreground/70 mb-4 font-zen">
                      ほんのり甘くて、透明感のある香り。春の朝、そっと風に揺れる花のような、やさしく可憐なフレグランス。
                    </p>
                    <div className="flex justify-end">
                      <span className="text-primary text-sm flex items-center font-montserrat">
                        詳細を見る
                        <ArrowLeft className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
              <motion.div
                className="bg-white rounded-lg overflow-hidden shadow-sm"
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <Link href="/showcase/eternal-smoke">
                  <div className="relative aspect-[3/4] bg-white flex items-center justify-center group">
                    <div className="w-full h-full relative">
                      <Image 
                        src="/images/eternal-smoke.png" 
                        alt="Eternal Smoke" 
                        fill 
                        className="object-contain p-4 transition-transform duration-700 group-hover:scale-105" 
                        loading="lazy"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-medium mb-2 text-secondary-foreground font-zen">Eternal Smoke</h3>
                    <p className="text-sm text-secondary-foreground/70 mb-4 font-zen">
                      ネオンの残光、路地裏の静寂、その空気ごとまとうような、深く長いスモーキーな香り。
                    </p>
                    <div className="flex justify-end">
                      <span className="text-primary text-sm flex items-center font-montserrat">
                        詳細を見る
                        <ArrowLeft className="ml-1 h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
