"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"

type Message = {
  id: string
  isAi: boolean
  content: string
  options?: string[]
}

type Step = "intro" | "top" | "middle" | "base" | "bottle" | "payment" | "complete"

export function AIBlendChat({ initialQuery }: { initialQuery?: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [currentStep, setCurrentStep] = useState<Step>("intro")
  const [selectedScents, setSelectedScents] = useState({
    top: null as string | null,
    middle: null as string | null,
    base: null as string | null,
  })
  const [isTyping, setIsTyping] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  // 自動スクロール
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // 初期メッセージを設定
  useEffect(() => {
    // 初期メッセージを設定
    const initialMessages: Message[] = []

    if (initialQuery) {
      initialMessages.push({
        id: `user-initial`,
        isAi: false,
        content: initialQuery,
      })

      initialMessages.push({
        id: `ai-initial-response`,
        isAi: true,
        content: `「${initialQuery}」ですね💖\n初恋って、どんな感じを思い出させますか？\n例えば、甘酸っぱい記憶やドキドキ感、それとも特別な香りを感じたことがあるかもしれませんね。\nもう少し教えてくれると、よりぴったりな香りを提案できますよ！`,
        options: ["朝の爽やかな空気のような香り", "少し甘くてフローラルな香り", "ほんのりと暖かみのある香り"],
      })
    } else {
      // 初期メッセージ
      initialMessages.push({
        id: `ai-welcome`,
        isAi: true,
        content: "こんにちは！あなただけのオリジナル香水を一緒に作りましょう✨\nどんな香りをイメージしていますか？",
        options: ["爽やかな朝の香り", "リラックスできる香り", "特別な日に身につけたい香り"],
      })
    }

    setMessages(initialMessages)
  }, [initialQuery])

  const handleSendMessage = () => {
    if (!input.trim()) return

    // ユーザーメッセージを追加
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      isAi: false,
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // AIの応答を追加（タイピング中の表示）
    setIsTyping(true)

    // 現在のステップに基づいて応答を生成
    setTimeout(() => {
      let aiResponse: Message

      if (currentStep === "intro") {
        aiResponse = {
          id: `ai-${Date.now()}`,
          isAi: true,
          content:
            "なるほど！「甘酸っぱさ」が感じられる初恋の香り、素敵ですね💖\nそれなら、フレッシュで爽やかな柑橘系と、華やかな花の香りを合わせると、あの時の感覚にぴったりです。\nまずは、トップノートに合う香りを選んでいきましょう！",
          options: [
            "レモン（シャープで爽やか）",
            "ベルガモット（フルーティーでフローラル）",
            "グレープフルーツ（少し苦味のあるフレッシュな香り）",
          ],
        }
        setCurrentStep("top")
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          isAi: true,
          content: "素敵な選択ですね！次のステップに進みましょう✨",
        }
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleOptionSelect = (option: string) => {
    // 選択肢を選んだ場合のユーザーメッセージ
    const userMessage: Message = {
      id: `user-option-${Date.now()}`,
      isAi: false,
      content: option.split("（")[0], // 括弧内の説明を除去
    }

    setMessages((prev) => [...prev, userMessage])

    // AIの応答を追加（タイピング中の表示）
    setIsTyping(true)

    setTimeout(() => {
      let aiResponse: Message
      let nextStep: Step = currentStep

      // 現在のステップに基づいて応答と次のステップを設定
      switch (currentStep) {
        case "intro":
          aiResponse = {
            id: `ai-top-${Date.now()}`,
            isAi: true,
            content:
              "なるほど！素敵な香りのイメージですね✨\nそれでは、まずはトップノートに合う香りを選んでいきましょう！",
            options: [
              "レモン（シャープで爽やか）",
              "ベルガモット（フルーティーでフローラル）",
              "グレープフルーツ（少し苦味のあるフレッシュな香り）",
            ],
          }
          nextStep = "top"
          break

        case "top":
          // トップノートの選択を保存
          setSelectedScents((prev) => ({ ...prev, top: option.split("（")[0] }))

          aiResponse = {
            id: `ai-middle-${Date.now()}`,
            isAi: true,
            content: `${option.split("（")[0]}ですね！🌟${option.split("（")[1]?.replace("）", "") || "素敵な選択です"}💖\n次は、ミドルノートの香りを決めていきましょう。\n甘く華やかな花の香りを加えると、さらに魅力的に仕上がります。`,
            options: [
              "ジャスミン（甘く華やかな香り）",
              "ローズ（エレガントで優雅な香り）",
              "ラベンダー（穏やかで落ち着く花の香り）",
            ],
          }
          nextStep = "middle"
          break

        case "middle":
          // ミドルノートの選択を保存
          setSelectedScents((prev) => ({ ...prev, middle: option.split("（")[0] }))

          aiResponse = {
            id: `ai-base-${Date.now()}`,
            isAi: true,
            content: `${option.split("（")[0]}ですね！💐${option.split("（")[1]?.replace("）", "") || "素敵な選択です"}✨\n最後に、香りの余韻を作るラストノートを選びましょう！`,
            options: [
              "サンダルウッド（温かくウッディな香り）",
              "バニラ（甘く優しい香り）",
              "オークモス（しっかりとした木の香り）",
            ],
          }
          nextStep = "base"
          break

        case "base":
          // ベースノートの選択を保存
          setSelectedScents((prev) => ({ ...prev, base: option.split("（")[0] }))

          aiResponse = {
            id: `ai-bottle-${Date.now()}`,
            isAi: true,
            content: `${option.split("（")[0]}ですね！温かみと深みのある香りが、初恋の余韻を長く残してくれます💖\nこれで、あなたのオリジナル香水が完成しました！✨\n次は、どの瓶に入れたいか選んでみましょう！`,
            options: [
              "瓶タイプ1（シンプルでエレガント）",
              "瓶タイプ2（モダンでスタイリッシュ）",
              "瓶タイプ3（クラシックで上品）",
            ],
          }
          nextStep = "bottle"
          break

        case "bottle":
          aiResponse = {
            id: `ai-payment-${Date.now()}`,
            isAi: true,
            content: "あなたの香水が完成しました！\n次は、お支払い方法を選んでいただき、購入手続きを進めましょう。",
            options: ["クレジットカード", "PayPal", "銀行振込"],
          }
          nextStep = "payment"
          break

        case "payment":
          aiResponse = {
            id: `ai-complete-${Date.now()}`,
            isAi: true,
            content:
              "ご注文ありがとうございます！\n決済処理が完了しました。あなただけのオリジナル香水を2週間以内にお届けします。\n香りの旅をお楽しみください✨",
          }
          nextStep = "complete"
          break

        default:
          aiResponse = {
            id: `ai-default-${Date.now()}`,
            isAi: true,
            content: "素敵な選択ですね！次のステップに進みましょう✨",
          }
      }

      setMessages((prev) => [...prev, aiResponse])
      setCurrentStep(nextStep)
      setIsTyping(false)
    }, 1500)
  }

  // シンプルなチャットメッセージコンポーネント
  const ChatMessage = ({ message }: { message: Message }) => {
    return (
      <div className={`flex w-full mb-4 ${message.isAi ? "justify-start" : "justify-end"}`}>
        <div className={`flex max-w-[80%] md:max-w-[70%] ${message.isAi ? "flex-row" : "flex-row-reverse"}`}>
          {message.isAi && (
            <div className="flex-shrink-0 mr-3">
              <Avatar className="h-8 w-8 bg-primary text-white">
                <span className="text-xs">AI</span>
              </Avatar>
            </div>
          )}
          <div
            className={`rounded-lg p-4 ${message.isAi ? "bg-white border border-gray-100 text-secondary-foreground" : "bg-primary text-white"}`}
          >
            <div className="whitespace-pre-line">{message.content}</div>

            {message.options && message.isAi && (
              <div className="mt-4 space-y-2">
                {message.options.map((option, index) => (
                  <Button
                    key={`${message.id}-option-${index}`}
                    onClick={() => handleOptionSelect(option)}
                    variant="outline"
                    className="w-full justify-start text-left border-gray-300 hover:bg-primary/10 hover:text-primary hover:border-primary transition-colors"
                  >
                    {option}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // シンプルなTipsコンポーネント
  const Tips = () => {
    // ノートの説明
    const noteDescriptions = {
      top: "トップノートは最初に感じる香りで、約15分〜2時間持続します。フレッシュで爽やかな印象を与えます。",
      middle: "ミドルノートは香りの中心となり、2〜4時間持続します。フローラルやスパイシーな香りが特徴です。",
      base: "ラストノートは最も長く持続する香りで、4〜24時間続きます。深みと温かみのある香りが特徴です。",
    }

    // 香料の説明
    const scentDescriptions: Record<string, string> = {
      // トップノート
      レモン: "シャープで爽やかな柑橘系の香り。明るく前向きな気分にしてくれます。",
      ベルガモット: "フルーティーでフローラルな柑橘系の香り。エレガントで洗練された印象を与えます。",
      グレープフルーツ: "少し苦味のあるフレッシュな柑橘系の香り。活力と元気を与えてくれます。",

      // ミドルノート
      ジャスミン: "甘く華やかな花の香り。官能的で魅惑的な印象を与えます。",
      ローズ: "エレガントで優雅な花の香り。女性らしさと上品さを演出します。",
      ラベンダー: "穏やかで落ち着く花の香り。リラックス効果があり、心を落ち着かせます。",

      // ベースノート
      サンダルウッド: "温かくウッディな香り。深みと安定感のある印象を与えます。",
      バニラ: "甘く優しい香り。温かみと安心感を与え、親しみやすい印象を作ります。",
      オークモス: "しっかりとした木の香り。大地を思わせる自然な印象を与えます。",
    }

    // 現在のステップに応じた説明を表示
    const renderContent = () => {
      switch (currentStep) {
        case "intro":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">香水の基本</h3>
              <p className="text-xs text-secondary-foreground/70 font-zen">
                香水は「トップノート」「ミドルノート」「ラストノート」の3層構造になっています。
                それぞれのノートが時間の経過とともに変化し、香りの物語を紡ぎます。
              </p>
            </div>
          )
        case "top":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">トップノート</h3>
              <p className="text-xs text-secondary-foreground/70 font-zen">{noteDescriptions.top}</p>
              {selectedScents.top && (
                <div className="mt-3 p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">{selectedScents.top}</h4>
                  <p className="text-xs text-secondary-foreground/70 font-zen">
                    {scentDescriptions[selectedScents.top]}
                  </p>
                </div>
              )}
            </div>
          )
        case "middle":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">ミドルノート</h3>
              <p className="text-xs text-secondary-foreground/70 font-zen">{noteDescriptions.middle}</p>
              {selectedScents.middle && (
                <div className="mt-3 p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">{selectedScents.middle}</h4>
                  <p className="text-xs text-secondary-foreground/70 font-zen">
                    {scentDescriptions[selectedScents.middle]}
                  </p>
                </div>
              )}
            </div>
          )
        case "base":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">ラストノート</h3>
              <p className="text-xs text-secondary-foreground/70 font-zen">{noteDescriptions.base}</p>
              {selectedScents.base && (
                <div className="mt-3 p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">{selectedScents.base}</h4>
                  <p className="text-xs text-secondary-foreground/70 font-zen">
                    {scentDescriptions[selectedScents.base]}
                  </p>
                </div>
              )}
            </div>
          )
        case "bottle":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">選んだ香り</h3>
              <div className="space-y-2">
                <div className="p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">トップノート: {selectedScents.top}</h4>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">ミドルノート: {selectedScents.middle}</h4>
                </div>
                <div className="p-2 bg-primary/10 rounded-md">
                  <h4 className="text-xs font-medium font-zen">ラストノート: {selectedScents.base}</h4>
                </div>
              </div>
            </div>
          )
        case "complete":
          return (
            <div>
              <h3 className="font-medium mb-2 font-zen">完成した香り</h3>
              <p className="text-xs text-secondary-foreground/70 font-zen">
                あなただけのオリジナル香水が完成しました。 この香りがあなたの特別な瞬間を彩りますように。
              </p>
            </div>
          )
        default:
          return null
      }
    }

    return (
      <div className="fixed bottom-4 left-4 w-64 bg-white p-4 rounded-lg shadow-md z-10">
        <div className="flex items-center mb-3">
          <Info className="h-4 w-4 text-primary mr-2" />
          <h2 className="text-sm font-medium font-zen">Tips</h2>
        </div>
        {renderContent()}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* チャット部分 */}
      <div className="flex-grow overflow-y-auto p-4 bg-[#f9f5f0]">
        <div className="max-w-3xl mx-auto">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && (
            <div className="flex w-full mb-4 justify-start">
              <div className="flex max-w-[80%] md:max-w-[70%] flex-row">
                <div className="flex-shrink-0 mr-3">
                  <Avatar className="h-8 w-8 bg-primary text-white">
                    <span className="text-xs">AI</span>
                  </Avatar>
                </div>
                <div className="rounded-lg p-4 bg-white text-secondary-foreground">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 入力部分 */}
      <div className="border-t p-4 bg-white">
        <div className="max-w-3xl mx-auto flex">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            className="flex-grow mr-2"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSendMessage()}
            disabled={currentStep === "complete"}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || currentStep === "complete"}
            className="bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tipsサイドバー */}
      <Tips />
    </div>
  )
}

