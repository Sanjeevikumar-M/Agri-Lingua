"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile, saveUserProfile, updateStreak } from "@/lib/storage"
import type { UserProfile } from "@/lib/types"
import { MODULES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    // Update streak
    userProfile = updateStreak(userProfile)
    saveUserProfile(userProfile)

    setProfile(userProfile)
    setIsLoading(false)
  }, [router])

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const completionPercentage = (profile.completedModules.length / MODULES.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🛰️🌾</span>
            <h1 className="text-2xl font-bold">Agri-Lingua</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-semibold">{profile.totalXP} XP</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl">🔥</span>
              <span className="font-semibold">{profile.currentStreak} day streak</span>
            </div>

            <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>
              👤 {profile.username}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <Card className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {profile.username}! 👋</h2>
          <p className="text-muted-foreground mb-4">Continue your journey to become a data-driven farmer</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-semibold">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-3" />
          </div>
        </Card>

        {/* Modules Grid */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Learning Modules</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map((module) => {
              const isCompleted = profile.completedModules.includes(module.id)
              const isLocked = module.isLocked && !profile.completedModules.includes(module.id - 1)
              const isCurrent = module.id === profile.currentModule

              return (
                <Card
                  key={module.id}
                  className={`p-6 transition-all hover:shadow-lg ${
                    isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"
                  } ${isCurrent ? "ring-2 ring-primary" : ""} ${isCompleted ? "bg-green-50 border-green-200" : ""}`}
                  onClick={() => {
                    if (!isLocked) {
                      router.push(`/module/${module.id}`)
                    }
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{module.icon}</span>
                    {isLocked && <span className="text-2xl">🔒</span>}
                    {isCompleted && <span className="text-2xl">✅</span>}
                  </div>

                  <h3 className="text-xl font-bold mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{module.description}</p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{module.lessons.length} lessons</span>
                    <span className="font-semibold text-primary">+{module.xpReward} XP</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card
            className="p-6 cursor-pointer hover:shadow-lg transition-all"
            onClick={() => router.push("/leaderboard")}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h3 className="font-semibold">Leaderboard</h3>
                <p className="text-sm text-muted-foreground">See top farmers</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all" onClick={() => router.push("/badges")}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎖️</span>
              <div>
                <h3 className="font-semibold">Badges</h3>
                <p className="text-sm text-muted-foreground">{profile.badges.length} earned</p>
              </div>
            </div>
          </Card>

          <Card
            className={`p-6 transition-all ${
              profile.completedModules.length > 0
                ? "cursor-pointer hover:shadow-lg bg-gradient-to-br from-purple-50 to-pink-50"
                : "opacity-50 cursor-not-allowed"
            }`}
            onClick={() => {
              if (profile.completedModules.length > 0) {
                router.push("/ar-viewer")
              }
            }}
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📱</span>
              <div>
                <h3 className="font-semibold">AR Viewer</h3>
                <p className="text-sm text-muted-foreground">
                  {profile.completedModules.length > 0 ? "Visualize data" : "Complete a module"}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6 cursor-pointer hover:shadow-lg transition-all" onClick={() => router.push("/about")}>
            <div className="flex items-center gap-3">
              <span className="text-3xl">ℹ️</span>
              <div>
                <h3 className="font-semibold">About</h3>
                <p className="text-sm text-muted-foreground">Learn more</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
