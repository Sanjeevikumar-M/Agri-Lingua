"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WelcomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user already exists
    const profile = getUserProfile()
    if (profile) {
      router.push("/dashboard")
    } else {
      setIsLoading(false)
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-blue-50">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-green-50 via-emerald-50 to-blue-50">
      <Card className="max-w-2xl w-full p-8 md:p-12 text-center space-y-6 shadow-lg">
        <div className="flex justify-center mb-4">
          <div className="text-8xl">🛰️🌾</div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-balance">Welcome to Agri-Lingua</h1>

        <p className="text-xl text-muted-foreground text-balance">
          Learn sustainable farming through NASA Earth science data
        </p>

        <div className="bg-muted/50 rounded-lg p-6 space-y-3 text-left">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💧</span>
            <div>
              <h3 className="font-semibold">Master Soil Moisture</h3>
              <p className="text-sm text-muted-foreground">Learn to read SMAP satellite data</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🌾</span>
            <div>
              <h3 className="font-semibold">Monitor Plant Health</h3>
              <p className="text-sm text-muted-foreground">Use Landsat NDVI for crop analysis</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🏆</span>
            <div>
              <h3 className="font-semibold">Earn Badges & XP</h3>
              <p className="text-sm text-muted-foreground">Gamified learning with rewards</p>
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button size="lg" className="w-full md:w-auto px-12 text-lg" onClick={() => router.push("/onboarding")}>
            Get Started
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">Built for NASA Space Apps Challenge 2025</p>
      </Card>
    </div>
  )
}
