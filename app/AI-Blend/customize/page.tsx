"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Image from "next/image"

export default function AIBlendCustomizePage() {
  const [selectedBottle, setSelectedBottle] = useState<string>("round")
  const [fragranceName, setFragranceName] = useState<string>("")
  const [labelImage, setLabelImage] = useState<File | null>(null)

  const handleSaveDraft = () => {
    // Logic to save draft will be implemented later
    console.log("Saving draft...")
    alert("下書きとして保存しました。")
  }

  const handleCheckout = () => {
    // Stripe checkout flow will be implemented later
    console.log("Proceeding to checkout...")
    alert("注文処理を開始します。")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLabelImage(e.target.files[0])
    }
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">あなたの香りが完成しました</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
          最後の仕上げをして、世界に一つのフレグランスを完成させましょう。
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <form className="space-y-8">
          {/* Fragrance Name Input */}
          <div className="space-y-2">
            <Label htmlFor="fragrance-name" className="text-lg">
              香水の名前（任意）
            </Label>
            <Input
              id="fragrance-name"
              placeholder="例：Eternal Blossom"
              value={fragranceName}
              onChange={(e) => setFragranceName(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Bottle Selection */}
          <div className="space-y-4">
            <Label className="text-lg block mb-4">ボトルの形を選んでください</Label>
            <RadioGroup
              value={selectedBottle}
              onValueChange={setSelectedBottle}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="relative">
                <RadioGroupItem value="round" id="bottle-round" className="sr-only" />
                <Label
                  htmlFor="bottle-round"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedBottle === "round" ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="relative w-24 h-32 mb-2">
                    <Image
                      src="/placeholder.svg?height=128&width=96"
                      alt="丸型ボトル"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>丸型</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="square" id="bottle-square" className="sr-only" />
                <Label
                  htmlFor="bottle-square"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedBottle === "square"
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="relative w-24 h-32 mb-2">
                    <Image
                      src="/placeholder.svg?height=128&width=96"
                      alt="四角型ボトル"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>四角型</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="teardrop" id="bottle-teardrop" className="sr-only" />
                <Label
                  htmlFor="bottle-teardrop"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedBottle === "teardrop"
                      ? "border-primary bg-primary/10"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="relative w-24 h-32 mb-2">
                    <Image
                      src="/placeholder.svg?height=128&width=96"
                      alt="雫型ボトル"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>雫型</span>
                </Label>
              </div>

              <div className="relative">
                <RadioGroupItem value="slim" id="bottle-slim" className="sr-only" />
                <Label
                  htmlFor="bottle-slim"
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedBottle === "slim" ? "border-primary bg-primary/10" : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <div className="relative w-24 h-32 mb-2">
                    <Image
                      src="/placeholder.svg?height=128&width=96"
                      alt="スリム型ボトル"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>スリム型</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Label Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="label-image" className="text-lg">
              ラベル画像をアップロード（任意）
            </Label>
            <div className="max-w-md">
              <Input
                id="label-image"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-sm text-gray-500 mt-1">JPEG / PNG / 最大5MB</p>
            </div>
          </div>
        </form>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" size="lg" onClick={handleSaveDraft} className="px-6">
          保存してあとで注文する
        </Button>
        <Button size="lg" onClick={handleCheckout} className="px-6">
          今すぐ注文する
        </Button>
      </div>
    </main>
  )
}

