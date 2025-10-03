"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile } from "@/lib/storage"
import type { UserProfile } from "@/lib/types"
import { BADGES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function BadgesPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

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

  const allBadges = Object.values(BADGES)
  const earnedBadgeIds = profile.badges.map((b) => b.id)

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <span className="font-semibold">{profile.totalXP} XP</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Your Badges</h1>
          <p className="text-xl text-muted-foreground">
            {profile.badges.length} of {allBadges.length} badges earned
          </p>
        </div>

        {/* Progress Bar */}
        <Card className="p-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Collection Progress</span>
              <span className="font-semibold">{Math.round((profile.badges.length / allBadges.length) * 100)}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-4">
              <div
                className="bg-primary rounded-full h-4 transition-all"
                style={{ width: `${(profile.badges.length / allBadges.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allBadges.map((badge) => {
            const isEarned = earnedBadgeIds.includes(badge.id)
            const earnedBadge = profile.badges.find((b) => b.id === badge.id)

            return (
              <Card
                key={badge.id}
                className={`p-6 transition-all ${
                  isEarned ? "bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200" : "opacity-50"
                }`}
              >
                <div className="text-center space-y-3">
                  <div className="text-6xl">{badge.icon}</div>

                  <div>
                    <h3 className="text-xl font-bold mb-1">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>

                  {isEarned && earnedBadge ? (
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground">
                        Earned on {new Date(earnedBadge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ) : (
                    <div className="pt-3 border-t">
                      <p className="text-xs text-muted-foreground">Not yet earned</p>
                    </div>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
