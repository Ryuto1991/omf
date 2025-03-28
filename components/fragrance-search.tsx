"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// 例のリスト - 短めの例文に調整
const EXAMPLE_PHRASES = [
  "初恋の香り",
  "放課後の図書室",
  "雨上がりの空気",
  "寂しさを癒すバニラ",
  "旅に出たくなる香り",
  "目覚めるような柑橘系",
  "幸せになれるベリー",
  "推しとすれ違った時",
  "花火大会の帰り道",
  "静かな夜のジャスミン",
  "失恋したあとの香り",
  "新しい街の風",
  "寝る前の香り",
  "淡い桜の記憶",
  "抱きしめられたい香り",
  "海沿いドライブ",
  "映画のラストシーン",
  "サプライズの香り",
  "冬の夜のカフェラテ",
  "夏祭りの金木犀",
  "髪を乾かす柔軟剤",
  "好きな人の香り",
  "胸が高鳴る香り",
  "自分らしさの香り",
  "背伸びしたい夜",
  "おしゃれなカフェ",
  "憧れの人の香り",
  "麦わら帽子の記憶",
  "甘いチョコの誘惑",
  "大切な人との休日",
  "二度と戻れない夏",
]

export default function FragranceSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [placeholder, setPlaceholder] = useState("")
  const router = useRouter()

  // コンポーネントマウント時にランダムな例文を選択
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * EXAMPLE_PHRASES.length)
    const randomExample = EXAMPLE_PHRASES[randomIndex]
    setPlaceholder(`今日はどんな香りをつくる？（例： ${randomExample}）`)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // 検索クエリをURLパラメータとして渡す（オプション）
    router.push(`/AI-Blend${searchQuery ? `?query=${encodeURIComponent(searchQuery)}` : ""}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-xl">
      <div className="relative flex-grow">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="pr-4 h-[42px] rounded-l-full border-r-0 bg-white text-secondary-foreground placeholder:text-secondary-foreground/50 focus-visible:ring-0 focus-visible:ring-offset-0 w-full text-sm"
        />
      </div>
      <Button
        type="submit"
        className="rounded-r-full bg-primary hover:bg-primary/90 text-white px-4 h-[42px] font-montserrat relative overflow-hidden group"
      >
        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-64 group-hover:h-64 opacity-10"></span>
        <span className="relative flex items-center">
          <Search className="h-4 w-4 mr-2" />
          今すぐ体験
        </span>
      </Button>
    </form>
  )
}

