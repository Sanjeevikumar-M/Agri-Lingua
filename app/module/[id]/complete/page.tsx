"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getUserProfile, saveUserProfile } from "@/lib/storage"
import type { UserProfile, Module } from "@/lib/types"
import { MODULES, BADGES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/use-window-size"

export default function ModuleCompletePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = Number.parseInt(params.id as string)
  const { width, height } = useWindowSize()

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [module, setModule] = useState<Module | null>(null)
  const [newBadge, setNewBadge] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    const foundModule = MODULES.find((m) => m.id === moduleId)

    if (!foundModule) {
      router.push("/dashboard")
      return
    }

    // Check if already completed
    if (userProfile.completedModules.includes(moduleId)) {
      router.push(`/module/${moduleId}`)
      return
    }

    // Award XP and mark module as complete
    userProfile.totalXP += foundModule.xpReward
    userProfile.completedModules.push(moduleId)

    // Award module-specific badge
    let badgeKey = ""
    switch (moduleId) {
      case 1:
        badgeKey = "SOIL_MASTER"
        break
      case 2:
        badgeKey = "PLANT_DOCTOR"
        break
      case 3:
        badgeKey = "WATER_WIZARD"
        break
      case 4:
        badgeKey = "RADAR_EXPERT"
        break
      case 5:
        badgeKey = "DROUGHT_HERO"
        break
    }

    if (badgeKey && BADGES[badgeKey]) {
      const badge = { ...BADGES[badgeKey], earnedAt: new Date().toISOString() }
      if (!userProfile.badges.find((b) => b.id === badge.id)) {
        userProfile.badges.push(badge)
        setNewBadge(badge.name)
      }
    }

    // Unlock next module
    if (moduleId < MODULES.length) {
      const nextModule = MODULES.find((m) => m.id === moduleId + 1)
      if (nextModule) {
        nextModule.isLocked = false
        userProfile.currentModule = moduleId + 1
      }
    }

    saveUserProfile(userProfile)
    setProfile(userProfile)
    setModule(foundModule)
    setIsLoading(false)
  }, [router, moduleId])

  if (isLoading || !profile || !module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />

      <Card className="max-w-2xl w-full p-12 text-center space-y-6 shadow-2xl">
        <div className="text-8xl mb-4">{module.icon}</div>

        <h1 className="text-4xl font-bold text-balance">Module Complete!</h1>

        <p className="text-xl text-muted-foreground">You've mastered {module.title}</p>

        <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg p-6 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <span className="text-3xl">⚡</span>
            <span className="text-3xl font-bold text-primary">+{module.xpReward} XP</span>
          </div>

          {newBadge && (
            <div className="flex items-center justify-center gap-3 pt-3 border-t border-green-200">
              <span className="text-3xl">🎖️</span>
              <div className="text-left">
                <p className="text-sm text-muted-foreground">New Badge Earned!</p>
                <p className="font-bold">{newBadge}</p>
              </div>
            </div>
          )}
        </div>

        <div className="pt-6 space-y-3">
          <Button size="lg" className="w-full" onClick={() => router.push("/dashboard")}>
            Continue Learning
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full bg-transparent"
            onClick={() => router.push(`/module/${moduleId}`)}
          >
            Review Module
          </Button>
        </div>
      </Card>
    </div>
  )
}
