"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MessageSquare, Package, Gift, ChevronDown, ChevronUp } from "lucide-react"
import { motion, useInView } from "framer-motion"

import { Button } from "@/components/ui/button"
import FloatingElements from "@/components/floating-elements"
import InfoBox from "@/components/info-box"
import AutoScrollShowcase from "@/components/auto-scroll-showcase"
import SiteHeader from "@/components/site-header"
import SiteFooter from "@/components/site-footer"
import NewsletterSubscription from "@/components/newsletter-subscription"
import FragranceSearch from "@/components/fragrance-search"

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // 料金プランセクションの参照を作成
  const pricingRef = useRef(null)
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2, margin: "-100px 0px" })

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "AIはどのように香りを選んでくれますか？",
      answer:
        "AIは、お客様との対話を通じて好みや気分、使用シーンなどを分析し、最適な香りの組み合わせを提案します。過去の調香データや香りの相性なども考慮して、お客様だけのオリジナルレシピを作成します.",
    },
    {
      question: "肌につけても大丈夫ですか？",
      answer:
        "肌に直接つけずに、フレグランススプレーとして、空間または布製品や衣類にご使用ください。ただし、白い生地や床素材によっては変色や変質などの恐れがあるので、取り扱う前には軽く目立たない場所でテストしてから使用することをおすすめします。万が一、目や肌について異常を感じた場合は、流水で流し、すぐに医師の診断を受けて下さい.",
    },
    {
      question: "香りの持続時間はどのくらいですか？",
      answer:
        "香りの持続時間は、使用環境や香りの種類によって異なりますが、一般的に4〜6時間程度持続します。ただし、シトラス系の香りは比較的短く、ウッディやオリエンタル系の香りは長く持続する傾向があります.",
    },
    {
      question: "注文から届くまでどのくらいかかりますか？",
      answer:
        "ご注文確定後、調合や品質チェックを経て、約2週間前後でお届けいたします。繁忙期や特殊なご要望がある場合は、さらにお時間をいただく場合がございます.",
    },
    {
      question: "返品・返金は可能ですか？",
      answer: "注文完了し、製造開始に進みますとキャンセル不可となります。ご了承お願い致します.",
    },
  ]

  return (
    <div className="min-h-screen bg-secondary overflow-x-hidden font-zen" suppressHydrationWarning>
      {/* @ts-ignore */}
      <SiteHeader />

      {/* Main Content */}
      <main className="pt-28 pb-20 relative">
        {/* Floating Elements */}
        <FloatingElements />

        {/* Hero Section */}
        <section className="relative bg-secondary mb-4">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-2 gap-4 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-medium mb-6 leading-tight text-secondary-foreground font-zen">
                  <span className="tracking-in-expand block">あなたの言葉が、</span>
                  <span className="tracking-in-expand block" style={{ animationDelay: "0.3s" }}>
                    香りになる。
                  </span>
                </h1>

                <motion.p
                  className="text-lg md:text-xl text-secondary-foreground mb-4 font-zen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                >
                  AIとつくる、あなただけのフレグランス。
                </motion.p>

                <motion.p
                  className="text-sm text-secondary-foreground/70 mb-8 max-w-md font-zen"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                >
                  Oh my fragranceは、AIと会話しながら“あなただけの香り”を
                  <br />
                  一緒につくるカスタムフレグランスサービスです。
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.0 }}
                  className="w-full max-w-xl"
                >
                  <FragranceSearch />
                </motion.div>
              </div>

              <div className="relative">
                {/* Info Boxes positioned on top of the image */}
                <div className="absolute top-0 right-0 flex flex-row space-x-2 z-10">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    className="w-32"
                  >
                    <InfoBox
                      title="価格"
                      description={
                        <>
                          <div className="flex flex-col items-center justify-center">
                            <span className="text-xs">（税込み・送料別）</span>
                            <span className="text-base font-medium text-secondary-foreground">4,400円～</span>
                          </div>
                        </>
                      }
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    className="w-32"
                  >
                    <InfoBox
                      title="全国発送"
                      description={
                        <>
                          お届けまで
                          <br />
                          <span className="font-medium text-secondary-foreground text-base">約2週間</span>
                        </>
                      }
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.9 }}
                  className="relative aspect-square md:aspect-auto md:h-[550px] md:-mr-8 md:mt-[-50px]"
                >
                  <Image src="/images/fragrance-bottles.png" alt="様々な香水ボトル" fill className="object-contain" />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* 以下は変更なし */}
        {/* 制作事例セクション（自動スクロール） - 香水作りのプロセスの上に配置 */}
        <section className="mb-16">
          <AutoScrollShowcase />
        </section>

        {/* Process Section */}
        <section className="mb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-2xl font-medium mb-2 text-secondary-foreground font-zen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                香水作りのプロセス
              </motion.h2>
              <motion.p
                className="text-secondary-foreground/70 font-montserrat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                あなただけの香りを届けるまでの3つのステップ
              </motion.p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, z: -100 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-secondary-foreground font-medium mb-1 font-zen">ステップ 1</h3>
                <h4 className="text-primary-light font-medium mb-3 font-montserrat">AIと香りを決める</h4>
                <p className="text-sm text-secondary-foreground/70 font-zen">
                  AIがあなたとの会話を通じて香りの好みや気分を読み取り、あなただけの香りのレシピを一緒に作ります。
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, z: -100 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Package className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-secondary-foreground font-medium mb-1 font-zen">ステップ 2</h3>
                <h4 className="text-primary-light font-medium mb-3 font-montserrat">パッケージの選択</h4>
                <p className="text-sm text-secondary-foreground/70 font-zen">
                  お好みのボトルデザインとパッケージを選択いただけます。あなただけの特別な一本をつくりましょう。
                </p>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm flex flex-col items-center text-center"
                initial={{ opacity: 0, z: -100 }}
                whileInView={{ opacity: 1, z: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Gift className="h-8 w-8 text-secondary-foreground" />
                </div>
                <h3 className="text-secondary-foreground font-medium mb-1 font-zen">ステップ 3</h3>
                <h4 className="text-primary-light font-medium mb-3 font-montserrat">お手元にお届け</h4>
                <p className="text-sm text-secondary-foreground/70 font-zen">
                  丁寧に調合されたフレグランスを美しいパッケージに入れて、大切にお届けいたします。
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 料金プランセクション - ABOUTの上に配置 */}
        <section className="mb-24" ref={pricingRef}>
          <div className="container mx-auto px-4 md:px-8">
            <div className="text-center mb-12">
              <motion.h2
                className="text-2xl font-medium mb-2 text-secondary-foreground font-zen"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                料金プラン
              </motion.h2>
              <div className="w-24 h-1 bg-primary mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* プリセット香水プラン */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <div className="bg-primary text-white p-4 -mt-8 -mx-8 mb-6 relative">
                  <span className="absolute -top-3 right-4 bg-yellow-400 text-xs text-black px-2 py-1 rounded-full font-bold shadow-sm">
                    人気の香りを選ぶ
                  </span>
                  <h3 className="text-xl font-medium text-center font-zen">セレクト香水プラン</h3>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-sm font-zen">価格：</span>
                    <span className="text-2xl font-bold ml-2 font-zen">4,400円</span>
                    <span className="text-sm ml-1 font-zen">（税込）</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">内容量：30ml</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">選べる香り：人気の10種類から香りを選ぶ</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">お好きな画像をラベルに印刷（写真・イラスト・ロゴなどOK）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">全国一律送料：550円（税込）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-primary text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">納期目安：ご注文から約2週間前後</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="/select-fragrance" scroll={true}>
                      <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-2 font-montserrat relative overflow-hidden group">
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">好きな香りを選ぶ</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* AIカスタム香水プラン */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300 border-2 border-accent-light relative z-10 transform scale-[1.02]"
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              >
                <div className="bg-accent-light text-white p-4 -mt-8 -mx-8 mb-6 relative">
                  <span className="absolute -top-3 right-4 bg-yellow-400 text-xs text-black px-2 py-1 rounded-full font-bold shadow-sm">
                    AIと香りをつくる
                  </span>
                  <h3 className="text-xl font-medium text-center font-zen">AIブレンド香水プラン</h3>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-sm font-zen">価格：</span>
                    <span className="text-2xl font-bold ml-2 font-zen">5,980円</span>
                    <span className="text-sm ml-1 font-zen">（税込）</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent-light/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent-light text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">内容量：30ml</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent-light/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent-light text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">AIがあなたのイメージに合わせて香りを調合</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent-light/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent-light text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">お好きな画像をラベルに印刷（写真・イラスト・ロゴなどOK）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent-light/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent-light text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">全国一律送料：550円（税込）</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent-light/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent-light text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">納期目安：ご注文から約2週間前後</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="/AI-Blend" scroll={true}>
                      <Button className="bg-accent-light hover:bg-accent-light/90 text-white rounded-full px-6 py-2 font-montserrat relative overflow-hidden group">
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">今すぐ体験する</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* まとめ買いプラン */}
              <motion.div
                className="bg-white p-8 rounded-lg shadow-sm hover:-translate-y-2 hover:scale-[1.02] hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isPricingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              >
                <div className="bg-accent text-white p-4 -mt-8 -mx-8 mb-6 relative">
                  <span className="absolute -top-3 right-4 bg-yellow-400 text-xs text-black px-2 py-1 rounded-full font-bold shadow-sm">
                    企業・ブランド向け
                  </span>
                  <h3 className="text-xl font-medium text-center font-zen">まとめ買いプラン（10本〜）</h3>
                </div>
                <div className="mb-6">
                  <div className="flex items-baseline mb-2">
                    <span className="text-sm font-zen">価格：</span>
                    <span className="text-xl font-bold ml-2 font-zen">本数・内容によりお見積もり</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">同一レシピ・複数ラベルで10本以上の注文に対応</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">ギフト・ノベルティ・法人利用にもおすすめ</span>
                  </li>
                  <li className="flex items-start">
                    <div className="h-5 w-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-accent text-xs">✓</span>
                    </div>
                    <span className="text-sm font-zen">本数により単価調整・納期のご相談可</span>
                  </li>
                </ul>
                <div className="flex justify-center">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="/contact" scroll={true}>
                      <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-6 py-2 font-montserrat relative overflow-hidden group">
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                        <span className="relative">お問い合わせ</span>
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="mb-24">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <motion.div
                className="max-w-xl"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-xl font-medium mb-4 text-secondary-foreground font-zen">ABOUT</h2>
                <p className="text-lg md:text-xl text-secondary-foreground/70 mb-12 font-zen">
                  Oh my fragranceは、AIを活用したオリジナルフレグランス作成サービスです。
                  あなたの好みや気分に合わせて、世界にひとつだけの香りを提案します。
                </p>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/concept" replace>
                    <Button
                      variant="outline"
                      className="rounded-full border-secondary-foreground hover:bg-secondary-foreground hover:text-white font-montserrat"
                    >
                      詳しく見る
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                className="relative w-full md:w-2/5 h-[300px] md:ml-auto"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/424eafcc-4b50-44b5-b02b-d702b768972c-jquvl9BYL5NvChtVCu2hOguaF0hifM.png"
                  alt="Oh my fragranceのボトル"
                  fill
                  className="object-contain object-right"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 「あなただけの香りを見つける」セクションを先に配置 */}
        <section className="mb-16">
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="bg-white p-8 md:p-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-2xl font-medium mb-6 text-secondary-foreground font-zen">
                  あなただけの香りを見つける
                </h2>
                <p className="text-secondary-foreground/70 mb-8 font-zen">
                  AIとの対話を通じて、あなたの個性や好みを反映したオリジナルフレグランスを作成できます。
                  今すぐ始めて、あなただけの特別な香りを見つけましょう。
                </p>
                <div className="space-y-8 mb-12">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link href="/AI-Blend" scroll={true}>
                      <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 py-6 h-auto font-montserrat relative overflow-hidden group">
                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-10"></span>
                        <span className="relative">AIと香りをつくる</span>
                      </Button>
                    </Link>
                  </motion.div>

                  <div className="pt-8 border-t border-gray-200">
                    <p className="text-secondary-foreground/70 mb-4 font-zen text-center">
                      最新情報をメールでお届けします
                    </p>
                    <NewsletterSubscription />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 「よくあるご質問」セクションを後に配置 */}
        <section>
          <div className="container mx-auto px-4 md:px-8">
            <motion.div
              className="bg-white p-8 md:p-12"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
            >
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-medium mb-8 text-secondary-foreground font-zen text-center">
                  よくあるご質問
                </h2>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div
                        className={`p-4 flex justify-between items-center cursor-pointer ${
                          openFaq === index ? "bg-primary/5" : "bg-white"
                        }`}
                        onClick={() => toggleFaq(index)}
                      >
                        <h3 className="font-medium text-secondary-foreground font-zen">Q. {faq.question}</h3>
                        <div className="flex-shrink-0 ml-2">
                          {openFaq === index ? (
                            <ChevronUp className="h-5 w-5 text-primary" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-secondary-foreground" />
                          )}
                        </div>
                      </div>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-secondary-foreground/70 text-sm font-zen">A. {faq.answer}</p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}

