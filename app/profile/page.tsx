"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile, clearUserData } from "@/lib/storage"
import type { UserProfile } from "@/lib/types"
import { MODULES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Flame, Calendar, Award } from "lucide-react"

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    setProfile(userProfile)
    setIsLoading(false)
  }, [router])

  const handleDeleteAccount = () => {
    clearUserData()
    router.push("/")
  }

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const completionPercentage = (profile.completedModules.length / MODULES.length) * 100
  const daysSinceJoined = Math.floor(
    (new Date().getTime() - new Date(profile.createdAt).getTime()) / (1000 * 60 * 60 * 24),
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Profile Header */}
        <Card className="p-8 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-4xl text-primary-foreground">
              {profile.username.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{profile.username}</h1>
              <p className="text-muted-foreground">Member for {daysSinceJoined} days</p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total XP</p>
                <p className="text-2xl font-bold">{profile.totalXP}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Streak</p>
                <p className="text-2xl font-bold">{profile.currentStreak} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
                <p className="text-2xl font-bold">{profile.longestStreak} days</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Badges Earned</p>
                <p className="text-2xl font-bold">{profile.badges.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Learning Progress */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4">Learning Progress</h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Modules Completed</span>
                <span className="font-semibold">
                  {profile.completedModules.length} / {MODULES.length}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className="bg-primary rounded-full h-3 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 pt-2">
              {MODULES.map((module) => {
                const isCompleted = profile.completedModules.includes(module.id)
                return (
                  <div
                    key={module.id}
                    className={`text-center p-3 rounded-lg border-2 ${
                      isCompleted ? "bg-green-50 border-green-200" : "bg-muted border-border"
                    }`}
                  >
                    <div className="text-2xl mb-1">{module.icon}</div>
                    <div className="text-xs font-medium">{isCompleted ? "Complete" : "Locked"}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </Card>

        {/* Recent Badges */}
        {profile.badges.length > 0 && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Recent Badges</h2>
              <Button variant="ghost" size="sm" onClick={() => router.push("/badges")}>
                View All
              </Button>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
              {profile.badges.slice(-5).map((badge) => (
                <div key={badge.id} className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <p className="text-xs font-medium">{badge.name}</p>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Danger Zone */}
        <Card className="p-6 border-destructive/50">
          <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>

          {!showDeleteConfirm ? (
            <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)}>
              Delete Account
            </Button>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Are you sure? This will permanently delete all your progress and cannot be undone.
              </p>
              <div className="flex gap-3">
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  Yes, Delete Everything
                </Button>
                <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}
