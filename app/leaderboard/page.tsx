"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getUserProfile, getLeaderboard } from "@/lib/storage"
import type { UserProfile, LeaderboardEntry } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Trophy, Medal, Award } from "lucide-react"

export default function LeaderboardPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    const leaderboardData = getLeaderboard()

    setProfile(userProfile)
    setLeaderboard(leaderboardData)
    setIsLoading(false)
  }, [router])

  if (isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  const userRank = leaderboard.findIndex((entry) => entry.username === profile.username) + 1

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
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <p className="text-xl text-muted-foreground">Top farmers learning with NASA data</p>
        </div>

        {/* User Rank Card */}
        {userRank > 0 && (
          <Card className="p-6 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-xl text-primary-foreground font-bold">
                  #{userRank}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Rank</p>
                  <p className="text-xl font-bold">{profile.username}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{profile.totalXP} XP</p>
                <p className="text-sm text-muted-foreground">{profile.badges.length} badges</p>
              </div>
            </div>
          </Card>
        )}

        {/* Leaderboard List */}
        <Card className="p-6">
          {leaderboard.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">No leaderboard data yet</p>
              <p className="text-sm text-muted-foreground">Complete lessons to appear on the leaderboard!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboard.map((entry, index) => {
                const isCurrentUser = entry.username === profile.username
                const rank = index + 1

                return (
                  <div
                    key={entry.username}
                    className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      isCurrentUser
                        ? "bg-primary/10 border-primary"
                        : rank <= 3
                          ? "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200"
                          : "bg-muted/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Rank */}
                      <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center font-bold text-lg">
                        {rank === 1 ? (
                          <Trophy className="h-6 w-6 text-yellow-500" />
                        ) : rank === 2 ? (
                          <Medal className="h-6 w-6 text-gray-400" />
                        ) : rank === 3 ? (
                          <Award className="h-6 w-6 text-amber-600" />
                        ) : (
                          `#${rank}`
                        )}
                      </div>

                      {/* Username */}
                      <div className="flex-1">
                        <p className="font-bold text-lg">{entry.username}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{entry.badges} badges</span>
                          <span>•</span>
                          <span>{entry.streak} day streak</span>
                        </div>
                      </div>

                      {/* XP */}
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{entry.totalXP}</p>
                        <p className="text-xs text-muted-foreground">XP</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </Card>

        {/* Info Card */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <Trophy className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold mb-1">How Rankings Work</h3>
              <p className="text-sm text-muted-foreground">
                Rankings are based on total XP earned. Complete lessons, modules, and earn badges to climb the
                leaderboard!
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  )
}
