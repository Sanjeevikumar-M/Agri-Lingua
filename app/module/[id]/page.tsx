"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getUserProfile } from "@/lib/storage"
import type { UserProfile, Module } from "@/lib/types"
import { MODULES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from "lucide-react"

export default function ModulePage() {
  const router = useRouter()
  const params = useParams()
  const moduleId = Number.parseInt(params.id as string)

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [module, setModule] = useState<Module | null>(null)
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

    // Check if module is locked
    if (foundModule.isLocked && !userProfile.completedModules.includes(moduleId - 1)) {
      router.push("/dashboard")
      return
    }

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

  const completedLessons = module.lessons.filter((l) => l.completed).length
  const progressPercentage = (completedLessons / module.lessons.length) * 100
  const isModuleCompleted = profile.completedModules.includes(module.id)

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
        {/* Module Header */}
        <Card className="p-8 bg-gradient-to-r from-green-100 to-emerald-100 border-green-200">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-6xl">{module.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-lg text-muted-foreground mb-4">{module.description}</p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Module Progress</span>
                  <span className="font-semibold">
                    {completedLessons} / {module.lessons.length} lessons
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </div>
          </div>

          {isModuleCompleted && (
            <div className="bg-green-200 border border-green-300 rounded-lg p-4 flex items-center gap-3">
              <span className="text-3xl">✅</span>
              <div>
                <h3 className="font-bold">Module Completed!</h3>
                <p className="text-sm">You earned +{module.xpReward} XP</p>
              </div>
            </div>
          )}
        </Card>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Lessons</h2>

          {module.lessons.map((lesson, index) => {
            const isCompleted = lesson.completed
            const isLocked = index > 0 && !module.lessons[index - 1].completed

            return (
              <Card
                key={lesson.id}
                className={`p-6 transition-all ${
                  isLocked ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-lg hover:scale-[1.02]"
                } ${isCompleted ? "bg-green-50 border-green-200" : ""}`}
                onClick={() => {
                  if (!isLocked) {
                    router.push(`/lesson/${lesson.id}`)
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        {isCompleted && <span className="text-xl">✅</span>}
                        {isLocked && <span className="text-xl">🔒</span>}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">{lesson.type}</span>
                        <span>•</span>
                        <span className="font-semibold text-primary">+{lesson.xpReward} XP</span>
                      </div>
                    </div>
                  </div>

                  {!isLocked && (
                    <Button variant={isCompleted ? "outline" : "default"}>{isCompleted ? "Review" : "Start"}</Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        {/* Module Completion Reward */}
        {!isModuleCompleted && completedLessons === module.lessons.length && (
          <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 border-yellow-200">
            <div className="text-center space-y-3">
              <span className="text-5xl">🎉</span>
              <h3 className="text-xl font-bold">Ready to Complete Module!</h3>
              <p className="text-muted-foreground">
                You've finished all lessons. Complete the module to earn your reward!
              </p>
              <Button size="lg" onClick={() => router.push(`/module/${module.id}/complete`)}>
                Complete Module
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  )
}
