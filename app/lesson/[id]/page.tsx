"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { getUserProfile, saveUserProfile } from "@/lib/storage"
import type { UserProfile, Lesson } from "@/lib/types"
import { MODULES } from "@/lib/game-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import TutorialLesson from "@/components/lessons/tutorial-lesson"
import QuizLesson from "@/components/lessons/quiz-lesson"
import ScenarioLesson from "@/components/lessons/scenario-lesson"

export default function LessonPage() {
  const router = useRouter()
  const params = useParams()
  const lessonId = params.id as string

  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [lesson, setLesson] = useState<Lesson | null>(null)
  const [moduleId, setModuleId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userProfile = getUserProfile()

    if (!userProfile) {
      router.push("/")
      return
    }

    // Find the lesson across all modules
    let foundLesson: Lesson | null = null
    let foundModuleId: number | null = null

    for (const module of MODULES) {
      const lessonInModule = module.lessons.find((l) => l.id === lessonId)
      if (lessonInModule) {
        foundLesson = lessonInModule
        foundModuleId = module.id
        break
      }
    }

    if (!foundLesson || !foundModuleId) {
      router.push("/dashboard")
      return
    }

    setProfile(userProfile)
    setLesson(foundLesson)
    setModuleId(foundModuleId)
    setIsLoading(false)
  }, [router, lessonId])

  const handleLessonComplete = (xpEarned: number) => {
    if (!profile || !lesson || !moduleId) return

    // Update profile
    const updatedProfile = { ...profile }
    updatedProfile.totalXP += xpEarned

    // Mark lesson as completed
    lesson.completed = true

    // Check if this is the first lesson completed (for badge)
    const allLessons = MODULES.flatMap((m) => m.lessons)
    const completedLessonsCount = allLessons.filter((l) => l.completed).length

    if (completedLessonsCount === 1) {
      // Award "First Steps" badge
      const firstStepsBadge = {
        id: "first_steps",
        name: "First Steps",
        description: "Complete your first lesson",
        icon: "🌱",
        earnedAt: new Date().toISOString(),
      }
      if (!updatedProfile.badges.find((b) => b.id === "first_steps")) {
        updatedProfile.badges.push(firstStepsBadge)
      }
    }

    saveUserProfile(updatedProfile)
    setProfile(updatedProfile)

    // Navigate back to module
    router.push(`/module/${moduleId}`)
  }

  if (isLoading || !profile || !lesson || !moduleId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-muted-foreground">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.push(`/module/${moduleId}`)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module
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
      <main className="max-w-4xl mx-auto px-4 py-8">
        <Card className="p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="capitalize">{lesson.type} Lesson</span>
              <span>•</span>
              <span className="font-semibold text-primary">+{lesson.xpReward} XP</span>
            </div>
          </div>

          {/* Render appropriate lesson type */}
          {lesson.type === "tutorial" && <TutorialLesson lesson={lesson} onComplete={handleLessonComplete} />}

          {lesson.type === "quiz" && <QuizLesson lesson={lesson} onComplete={handleLessonComplete} />}

          {lesson.type === "scenario" && <ScenarioLesson lesson={lesson} onComplete={handleLessonComplete} />}
        </Card>
      </main>
    </div>
  )
}
